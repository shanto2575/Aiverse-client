import React from 'react'

const PromptsDetailsPage = async({params}) => {
    const {id}=await params;
    console.log(id)
    return (
        <div>DetailsPage</div>
    )
}

export default PromptsDetailsPage