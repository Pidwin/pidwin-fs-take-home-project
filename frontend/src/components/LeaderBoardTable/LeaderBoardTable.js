import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', sortable: false, width: 70 },
    { field: 'name', headerName: 'Player Name', sortable: false, width: 70 },
    { field: 'email', headerName: 'Player Name', sortable: false, width: 70 },
    { field: 'token_amount', headerName: 'Player Name', sortable: false, width: 70 },
];

export default function LeaderBoardTable({ topTenPlayer }) {
    const row = topTenPlayer.map((item) => {
        return {
            id: (item._id),
            name: (item.name),
            email: (item.email),
            token_amount: (item.token_amount),
        }
    })
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={row}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}