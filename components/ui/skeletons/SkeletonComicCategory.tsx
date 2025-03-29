const SkeletonComicCategory = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="h-8 w-48 rounded mb-6 skeleton"></div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
        {Array(12)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="rounded-lg h-48 skeleton"></div>
          ))}
      </div>

      <div className="flex justify-center mt-6">
        <div className="w-48 h-10 rounded-lg skeleton"></div>
      </div>
    </div>
  );
};

export default SkeletonComicCategory;
