// import { Divider } from "@mui/material";

const FarmSettings = (formData, handleChange) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow duration-300">
      <div className="border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700">Farm Settings</h3>
        <p className="text-gray-500 text-sm pb-2.5">Configure your farm preferences</p>
      </div>
      <div className="mx-2 pt-3">
        <div className="flex justify-between items-center">
          <div className="font-medium text-gray-600">
            <p>Measurement Units</p>
          </div>
          <select id="units" name="units" value={formData.units} onChange={handleChange} 
          className="mt-1 block w-86 py-3 px-2 text-[#6c746c] text-sm font-normal rounded-lg border border-gray-300 focus:outline-[#d8eed5de] focus:outline-offset-2 focus-within:border-green-700 focus:duration-50">
            <option value="metric">Metric (°C, mm)</option>
            <option value="imperial">Imperial (°F, in)</option>
          </select>
        </div>
        {/* <Divider sx={{ my: 1.3 }} /> */}
        <div className="flex justify-between items-center">
          <div className="font-medium text-gray-600">
            <p>Data Sync Frequency</p>
          </div>
          <select
            id="syncFrequency"
            name="syncFrequency"
            value={formData.syncFrequency}
            onChange={handleChange}
          className="mt-1 block w-86 py-3 px-2 text-[#6c746c] text-sm font-normal rounded-lg border border-gray-300 focus:outline-[#d8eed5de] focus:outline-offset-2 focus-within:border-green-700 focus:duration-50"
          >
            <option value="5">Every 5 minutes</option>
            <option value="15">Every 15 minutes</option>
            <option value="30">Every 30 minutes</option>
            <option value="60">Every hour</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FarmSettings;