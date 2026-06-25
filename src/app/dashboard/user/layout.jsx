import { roleValidator } from '@/lib/session';
import React from 'react'

const UserLayout = async ({ children }) => {
    await roleValidator('user')
    return children;
}

export default UserLayout