/* program sito.c */
/* kompilacja: mpicc -o sito sito.c */
/* wykonanie: mpirun -np 2 sito */

#include <stdio.h>
#include <math.h>
#include <mpi.h>
#include <stdlib.h>

#define N 10000000
/* definiuje zakres 2..N */
#define S (int)sqrt(N)
#define M N/10

int main(int argc, char** argv) 
{
	long int a[S + 1];				/* tablica pomocnicza */
	long int podzielniki[S + 1]; 	/* podzielniki z zakresu 2..S */
	long int pierwsze[M];     		/* liczby pierwsze w podprzedzialach */ //\\

	int id;    			/* identyfikator procesu */
	int p;				/* liczba procesów */
	int *liczby_grom; 	/* tablica liczb gromadzonych liczb pierwszych */
	int *przem;   		/* tablica przemieszczen */
	double czas;   /* zmienna do mierzenia czasu */
	
	MPI_Status status;
	MPI_Init(&argc, &argv);
	czas = MPI_Wtime(); /* pomiar czasu */
	
	MPI_Comm_rank(MPI_COMM_WORLD, &id);
	MPI_Comm_size(MPI_COMM_WORLD, &p);
	
	int i, llpierx, k;
	int llpier;  		/* liczba liczb pierwszych w podprzedziale */
	int lpodz;  		/* liczba podzielnikow w tablicy podzielniki */
	int liczba_p; 		/* sumaryczna liczba znalezionych liczb pierwszych */
	/* wyznaczanie podzielnikow z zakresu 2..S */
	for (i = 2; i <= S; i++) a[i] = 1; 
	/* inicjalizacja */
	i = 1; 
	llpier = lpodz = 0;
	while (i <= S) {
		i++;
		if (a[i] == 1) {
			podzielniki[lpodz++] = pierwsze[llpier++] = i; /* zapamietanie liczby pierwszej */
			/* wykreslanie liczb zlozonych bedacych wielokrotnosciami i */
			for(k=i+i;k<=S;k+=i)a[k] = 0;}
	}
	
	int dl_podprz; 		/* dlugosc podprzedzialu liczb */
	/* rownolegle wyznaczanie liczb pierwszych w podprzedzialach */
	dl_podprz = (N - S) / p; /* obliczanie dlugosci podprzedzialu */
	if ((N - S) % p != 0) dl_podprz++;
	if (id > 0) llpier = 0;
	
	long int liczba, reszta;

	
	for (liczba = S+ 1 + dl_podprz * id;liczba < S+ 1 + dl_podprz * (id + 1); liczba++) 
	{
		if (liczba <= N) 
			{
			for (k = 0; k < lpodz; k++) {
				reszta = (liczba % podzielniki[k]);
				if (reszta == 0) break; /* liczba zlozona */
			}
			if (reszta != 0) pierwsze[llpier++] = liczba; /* zapamietanie liczby pierwszej */
		}
	}
	liczby_grom = (int *)malloc(p * sizeof(int));
	MPI_Gather(&llpier, 1, MPI_INT, liczby_grom, 1, MPI_INT, 0,MPI_COMM_WORLD);
	przem = (int *)malloc(p * sizeof(int)); /* przemieszczenia */
	przem[0] = 0;
	liczba_p = liczby_grom[0]; /* sumaryczna liczba wyznaczonych liczb pierwszych */
	for (i = 1; i < p; i++) {
		przem[i] = przem[i - 1] + liczby_grom[i - 1];
		liczba_p += liczby_grom[i];
	}/* gromadzenie liczb pierwszych w procesie 0 */
	MPI_Gatherv(pierwsze, llpier, MPI_LONG, pierwsze, liczby_grom, przem, MPI_LONG, 0,MPI_COMM_WORLD);
	if (id == 0) {
		czas = MPI_Wtime() - czas; /* obliczenie czasu dzialania */
		printf("czas: %f sek\n", czas);
		printf("Liczba procesow: %d N: %d dlugosc_podprzedzialow: %ld\n", p, N, (long int) dl_podprz);
	}
	MPI_Finalize();
	return 0;
}
