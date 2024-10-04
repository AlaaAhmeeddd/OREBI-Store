import { products } from "@/type"
import Container from "./Container"
import Heading from "./Heading"
import ProductCard from "./ProductCard"

const SpecialOffer = ({products, title}: products) => {
    return (
        <Container className="w-full pb-20">
                <Heading heading={title} />
                <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4">
                    {
                        products.map((item)=>(
                            <ProductCard key={item._id} product={item} />
                        ))
                    }
                </div>
            </Container>
    )
}

export default SpecialOffer