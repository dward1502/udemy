

function UserProfilePage(props) {
    return <h1>{props.username}</h1>
}

export default UserProfilePage;

export async function getServerSideProps(context){
    const {params} = context
    const userID = params.uid;

    return {
        props:{
            id='userid-' + userID
        }
    }

}