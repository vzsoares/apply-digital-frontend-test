export default function EmptyCartSection() {
  return (
    <section className="box flex-1 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some games to get started!</p>
      </div>
    </section>
  );
}