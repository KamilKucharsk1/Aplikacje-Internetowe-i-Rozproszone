#include <stdio.h>
#include <mpi.h>
#include <stdlib.h>
#include <math.h>

#define true 1
#define false 0

typedef int bool;

bool pierw(unsigned long long int n, unsigned long long int local_p, unsigned long long int local_k)
{
	bool local_pierw = true;
	
	for(unsigned long long int i = local_p; i <= local_k; i++)
	{
		if( n % i == 0)
		{
			local_pierw = false;
			break;
		}
	}
	
	return local_pierw;
}

int main(int argc, char* argv[])
{
	int EXIT_CODE = 1;
	int id;
	int p;
	unsigned long long int n = strtoull(argv[1], NULL, 10);
	unsigned long long int g = (unsigned long long int)sqrt(n);
	bool glob_pierw = true;
	bool loc_pierw;
	unsigned long long int przedzial;
	unsigned long long int local_p;
	unsigned long long int local_k;
	int zrodlo;
	int typ = 0;
	MPI_Status status;
	
	MPI_Init(&argc, &argv);
	MPI_Comm_rank(MPI_COMM_WORLD, &id);
	MPI_Comm_size(MPI_COMM_WORLD, &p);
	
	przedzial = g/p;
	local_p = (id * przedzial) + 2;
	local_k = ((id+1) * przedzial) +2;
	
	if(id == (p-1))
	{
		local_k = g;
	}

	loc_pierw = pierw(n, local_p, local_k);
	
	
	if ( id == 0 )
	{	
		glob_pierw = loc_pierw;
		for(zrodlo = 1; zrodlo <p; zrodlo++)
		{
			MPI_Recv(&loc_pierw, 1, MPI_INT, zrodlo, typ, MPI_COMM_WORLD, &status);

			if(loc_pierw == false)
			{
				glob_pierw = false;
			}
		}
	}
	else
	{
		MPI_Send(&loc_pierw, 1, MPI_INT, 0, typ, MPI_COMM_WORLD);
	}
	
	if( id == 0 )
	{
		if(glob_pierw == true)
		{
			EXIT_CODE = 0;
		}
		else
		{
			EXIT_CODE = 1;
		}
	}

	MPI_Finalize();

	if( id ==0 )
		exit(EXIT_CODE);
}
