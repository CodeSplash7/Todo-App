function Filter() {
  return (
    <>
      {/* Filters */}
      <div className="text-white flex flex-col gap-[5px]">
        <label className="text-[17px]" htmlFor="filters">
          Show:
        </label>
        {/* filtering button */}
        <div className="flex flex-col" id="filters">
          <div className="border">Active only</div>
          <div className="border">Completed only</div>
          <div className="border">Outdated only</div>
          <div className="border">All</div>
        </div>
      </div>
    </>
  );
}

export default Filter;
