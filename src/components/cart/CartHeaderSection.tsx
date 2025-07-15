interface CartHeaderSectionProps {
  itemCount: number;
}

export default function CartHeaderSection({ itemCount }: CartHeaderSectionProps) {
  return (
    <section className="box">
      <div className="section-container py-12">
        <div className="">
          <h1 className="text-3xl font-bold mb-3 text-gray-medium text-4xl">Your Cart</h1>
          <p className="text-gray-medium text-2xl">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
        </div>
      </div>
    </section>
  );
}