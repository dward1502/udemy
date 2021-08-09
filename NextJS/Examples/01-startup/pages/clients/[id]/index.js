import React from 'react'
import {useRouter} from 'next/router'

function ClientProjectsPage() {
    const router = useRouter()
    console.log(router.query)

    function loadProjectHandler() {
        //load data...
        router.push('/clients/max/projecta')
        //Alternative way to route programaticly
        // router.push({
        //     pathname: '/clients/[id]/[clientprojectid]',
        //     query: {id:'max', clientprojectid:'projecta'}
        // })
    }
    return (
        <div>
            <h1>The projects of a given client</h1>
            <button>Load Project A</button>
        </div>
    )
}

export default ClientProjectsPage
