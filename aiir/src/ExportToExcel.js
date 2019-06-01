import React from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import color from "@material-ui/core/colors/orange";

export default class ExportToExcel extends React.Component{

    render(){
        return(
            <div style={{marginRight: '25px'}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="export"
                    table="table-to-xls"
                    filename="filtredData"
                    sheet="tablexls"
                    buttonText="Export"
                />
                <table hidden="true" id="table-to-xls">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>args</th>
                        <th>stdout</th>
                        <th>stderr</th>
                        <th>return code</th>
                        <th>state</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.post.map(post =>{
                            return(
                                <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.args}</td>
                                <td>{post.stdout}</td>
                                <td>{post.stderr}</td>
                                <td>{post.returncode}</td>
                                <td>{post.state}</td>
                                
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            </div>
        )
    }
}