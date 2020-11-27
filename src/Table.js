import React from 'react';
import './Table.css';

function Table({ countries }) {
    console.log("Countries ---->", countries)
    return (
        <div className="table">
            {countries.map(({ country, cases }) => (
                <table key={country}>
                    <tbody>
                        <tr >
                            <td>{country}</td>
                            <td><strong>{cases}</strong></td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
    )
}

export default Table
