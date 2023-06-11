import { OptionType } from "@/types";
import * as React from "react";
import Select from "react-select";
import "./F1RacingResultsFilters.scss";
import { FormGroup, FormLabel } from "react-bootstrap";

export interface IF1RacingResultsFiltersProps {
  selectYear: (year: string | number) => void;
  selectGrand: (grand: string) => void;
  selectTeam: (team: string) => void;
  selectDriver: (driver: string) => void;
}

export default function F1RacingResultsFilters(
  props: IF1RacingResultsFiltersProps
) {
  const { selectYear, selectGrand, selectTeam, selectDriver } = props;

  const yearOptions = (startYear: number = 1950) => {
    const currentYear = new Date().getFullYear(),
      years = [];
    while (startYear <= currentYear) {
      const yearItem = startYear++;
      years.push({
        value: yearItem,
        label: yearItem,
      });
    }
    return years;
  };

  const grandOptions = [
    {
      value: "BAHRAIN",
      label: "BAHRAIN",
    },
    {
      value: "SAUDI ARABIA",
      label: "SAUDI ARABIA",
    },
  ];

  const teamOptions = [
    {
      value: "Red Bull Racing Honda RBPT",
      label: "Red Bull Racing Honda RBPT",
    },
    {
      value: "Mercedes",
      label: "Mercedes",
    },
  ];

  const driverOptions = [
    {
      value: "Verstappen Max",
      label: "Verstappen Max",
    },
    {
      value: "Perez Sergio",
      label: "Perez Sergio",
    },
  ];

  const handleSelectYear = (item: OptionType) => {
    selectYear(item.value);
  };

  const handleSelectGrand = (item: OptionType) => {
    selectGrand(item.value);
  };

  const handleSelectTeam = (item: OptionType) => {
    selectTeam(item.value);
  };

  const handleSelectDriver = (item: OptionType) => {
    selectDriver(item.value);
  };

  return (
    <div className="f1-racing-filters">
      <FormGroup className="form-group">
        <FormLabel>Year</FormLabel>
        <Select
          placeholder="Year"
          options={yearOptions()}
          onChange={handleSelectYear}
        />
      </FormGroup>

      <FormGroup className="form-group">
        <FormLabel>Grand</FormLabel>
        <Select
          placeholder="Grand"
          options={grandOptions}
          onChange={handleSelectGrand}
        />
      </FormGroup>

      <FormGroup className="form-group">
        <FormLabel>Team</FormLabel>
        <Select
          placeholder="Team"
          options={teamOptions}
          onChange={handleSelectTeam}
        />
      </FormGroup>

      <FormGroup className="form-group">
        <FormLabel>Driver</FormLabel>
        <Select
          placeholder="Driver"
          options={driverOptions}
          onChange={handleSelectDriver}
        />
      </FormGroup>
    </div>
  );
}
