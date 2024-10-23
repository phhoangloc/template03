import Layout from '@/components/admin/layout'
import React from 'react'
import { Metadata } from 'next';
type Props = {
    children: React.ReactNode
}
export const metadata: Metadata = {
    title: "Admin",
};
const layout = ({ children }: Props) => {

    return (
        <Layout>
            {children}
        </Layout>
    )
}

export default layout