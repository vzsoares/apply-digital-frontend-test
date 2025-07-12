import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <section className="bg-[#404040] box">
            <div className="section-container py-8">
                <div className="self-center" >
                    <Link href="/">
                        <Image src="/images/apply-digital-logo.png" alt="apply-digital-logo" width={170} height={44} />
                    </Link>
                </div>
            </div>
        </section >
    )
}

