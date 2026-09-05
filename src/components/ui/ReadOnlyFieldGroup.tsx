interface Field {
  label: string;
  value: string;
}

interface ReadOnlyFieldGroupProps {
  title: string;
  fields: Field[];
}

export default function ReadOnlyFieldGroup({ title, fields }: ReadOnlyFieldGroupProps) {
  return (
    <div className="flex flex-col gap-[15px] w-full">
      <p className="pretendard-sb-18 text-main-black">{title}</p>
      <div className="flex items-center justify-between gap-[11px]">
        {fields.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-1 h-[81px] flex-col items-center justify-center gap-[4px] rounded-[12px] bg-main-cool-gray"
          >
            <p className="pretendard-m-15 text-sub-gray-1">{label}</p>
            <p className="pretendard-sb-16 text-main-black">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
