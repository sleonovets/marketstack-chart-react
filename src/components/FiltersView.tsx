import React, { useState } from 'react';
import { Filters } from "../helpers/types";
import { SYMBOLS_REGEXP } from '../helpers/constants';
import "../styles/FiltersView.scss";

interface FiltersInterface {
  /**
  * Filter values object 
  */
  filters: Filters;
  /**
   * A callback that will be run when the filters are changed
  */
  onFilterChange: (value: string, type: string) => void;
}

/**
* Filters component. Allows user to filter 
*/
const FiltersView: React.FC<FiltersInterface> = ({ filters, onFilterChange }) => {
  const [errors, setErrors] = useState<Record<string, string>>({
    symbols: "Please provide symbols.",
  });

  const getDateString = (date: string) => date.split("T")[0];
  const regex = new RegExp(SYMBOLS_REGEXP);

  const onFilterDataChange = (value: string, type: string) => {
    const errorsData: Record<string, string> = { ...errors };
    if (type === "symbols") {
      if (!regex.test(value)) {
      errorsData["symbols"] = !value ? "Please provide symbols." : "Entered symbols are invalid. Input format: AAAA,BB";
      setErrors({ ...errors, ...errorsData });
      return;
    }
      errorsData["symbols"] = "";
      setErrors({ ...errors, ...errorsData });
  }

    if (type === "dateFrom") {
      const isInvalid = filters.dateTo && (new Date(filters.dateFrom).getTime() - new Date(value).getTime() < 0);
      errorsData["dateFrom"] = isInvalid
        ? "Start day must be earlier than end date."
        : "";

      if (errorsData["dateFrom"]) {
        setErrors({ ...errors, ...errorsData });
        return;
      }
    }

    if (type === "dateTo") {
      const isInvalid = filters.dateFrom && (new Date(value).getTime() - new Date(filters.dateFrom).getTime() < 0);
      errorsData["dateTo"] = isInvalid
        ? "End day must be later than start date."
        : "";

      if (errorsData["dateTo"]) {
        setErrors({ ...errors, ...errorsData });
        return;
      }
    }

    onFilterChange(value, type);
  }

  return <div className="filters">
    <div className="filters-item">
      <label className="filters-item-label">Start Date</label>
      <div>
        <input type="date" className={errors["dateFrom"] ? "filters-item-input error" : "filters-item-input"} value={filters.dateFrom ? getDateString(filters.dateFrom) : ""} onChange={(e) => onFilterDataChange(e.target.value, "dateFrom")} />
        <div style={{ display: errors["dateFrom"] ? "block" : "none" }} className="filters-item-error">
          {errors["dateFrom"]}
        </div>
      </div>
    </div>

    <div className="filters-item">
      <label className="filters-item-label">End Date</label>
      <div>
        <input type="date" className={errors["dateTo"] ? "filters-item-input error" : "filters-item-input"} value={filters.dateTo ? getDateString(filters.dateTo) : ""} onChange={(e) => onFilterDataChange(e.target.value, "dateTo")} />
        <div style={{ display: errors["dateTo"] ? "block" : "none" }} className="filters-item-error">
          {errors["dateTo"]}
        </div>
      </div>
    </div>

    <div className="filters-item">
      <label className="filters-item-label">Symbol/Ticker code</label>
      <div>
        <input className={errors["symbols"] ? "filters-item-input error" : "filters-item-input"} type="text" value={filters.symbols} onBlur={(e) => onFilterDataChange(e.target.value, "symbols")} />
        <div style={{ display: errors["symbols"] ? "block" : "none" }} className="filters-item-error">
          {errors["symbols"]}
        </div>
      </div>
    </div>
  </div>;
};

export default FiltersView;
