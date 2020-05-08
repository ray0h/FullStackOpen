import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const users = useSelector(state => state.users)
    return (
        <div className='mx-4'>
            <h2 className='text-2xl font-bold'>Users</h2>
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th></th>
                        <th className='text-lg w-6'>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id} className='border'>
                            <td className='text-xl text-left px-2 border border-gray-800'><Link to={`/users/${user.id}`} >{user.name}</Link></td>
                            <td className='text-xl text-center border border-gray-800'>{user.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users