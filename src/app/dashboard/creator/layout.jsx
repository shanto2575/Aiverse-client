import { roleValidator } from '@/lib/session';
import React from 'react'

const CreatorLayout = async ({ children }) => {
    await roleValidator('creator')
    return children;
}

export default CreatorLayout