import UserManagementTable from '@/components/Dashboard/admin/UserManagementTable'
import { AllUser } from '@/lib/admin/data'
import React from 'react'

const AllUserPage = async() => {
    const data=await AllUser()
    console.log(data.user)
    return (
        <div>
            <UserManagementTable users={data.user}/>
        </div>
    )
}

export default AllUserPage