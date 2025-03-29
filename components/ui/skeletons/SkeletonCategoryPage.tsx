const SkeletonCategoryPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="h-8 w-48 rounded mb-6 skeleton"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="rounded-lg p-4 h-24 skeleton"></div>
          ))}
      </div>
    </div>
  );
};

export default SkeletonCategoryPage;
