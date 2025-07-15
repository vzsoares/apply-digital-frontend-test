import Image from "next/image";
import Link from "next/link";

export default function CartNavigationSection() {
  return (
    <section className="box">
      <Link href="/" className="section-container py-6 flex-row gap-2 cursor-pointer">
        <Image src="/icons/arrow-left-icon.svg" width={24} height={24} alt="back arrow" />
        <h3 className="text-gray-medium font-medium">Back to Catalog</h3>
      </Link>
    </section>
  );
}