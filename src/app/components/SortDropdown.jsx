"use client";

export default function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="select select-bordered w-full sm:w-48"
    >
      <option value="default">
        সাজানো: ডিফল্ট
      </option>

      <option value="low">
        দাম: কম থেকে বেশি
      </option>

      <option value="high">
        দাম: বেশি থেকে কম
      </option>

      <option value="az">
        নাম: অ → হ
      </option>
    </select>
  );
}