interface ISectionTitle {
  title: string;
  color?: string;
}

const SectionTitle: React.FC<ISectionTitle> = ({
  title,
  color = '#ff416c',
}) => {
  return (
    <div className="text-center my-6">
      <h2
        className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wide"
        style={{ color }}
      >
        {title}
      </h2>
      <div
        className="mt-2 h-1 w-16 sm:w-24 mx-auto rounded-full"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

export default SectionTitle;
