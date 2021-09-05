import fs from 'fs/promises'
import path from 'path'

function HomePage(props) {
  const {products } = props;
  return (
    <ul>
        {products.map((product)=>{
          return(
            <li key={product.id}>{product.title}</li>
          )
        })}
    </ul>
  );
}
 

//getStaticProps runs before HomePage is rendered during build time
//code is in serverside never executed on client side

export async function getStaticProps(context){
  //cwd = current working directory
  console.log('(Re-)Generating....')
  const filePath = path.join(process.cwd(), 'data','dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  if (!data) {
    return{
      redirect:{
        destination: '/no-data'
      }
    }
  }
  if(data.products.length === 0) {
    return {notFound:true}
  }

  return {
    props:{
      products: data.products
    },
    //regenerates page every 10s allows data to be rendered onto page and than reload the page when new data is added instead of build again
    revalidate: 10,
  };
}


export default HomePage;
