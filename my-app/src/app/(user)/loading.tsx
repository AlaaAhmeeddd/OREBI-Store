import Container from "@/components/Container";
import Image from "next/image";
import loading from "@/assets/Spin@1x-1.0s-200px-200px.svg"

export default function Loading() {
    return (
        <Container className="flex justify-center relative top-1/4 h-[100vb]">
            <Image src={loading} alt="loading..." width={100} height={100} />
        </Container>
    )
}
