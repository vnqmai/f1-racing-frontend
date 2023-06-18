import { OptionType } from "@/types";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, FormLabel } from "react-bootstrap";
import Select from "react-select";
import "./F1RacingResultsFilters.scss";

export interface IF1RacingResultsFiltersProps {
  selectYear: (year: string | number) => void;
  selectGrand: (grand: string) => void;
  selectTeam: (team: string) => void;
  selectDriver: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function F1RacingResultsFilters(
  props: IF1RacingResultsFiltersProps
) {
  const { selectYear, selectGrand, selectTeam, selectDriver } = props;

  const [yearOptions, setYearOptions] = useState([]);
  const [grandOptions, setGrandOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);

  useEffect(() => {
    fetchYearOptions()
    fetchGrandOptions()
    fetchTeamOptions()
  }, [])

  const fetchYearOptions = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/years`)
    const years = await response.json();
    const formatedYearsOptions =  years.map((year: string) => ({ value: year, label: year }))
    setYearOptions(formatedYearsOptions)
  }

  const fetchGrandOptions = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/grands`)
    const grands = await response.json();
    const formatedGrandsOptions =  grands.map((grand: string) => ({ value: grand, label: grand }))
    setGrandOptions(formatedGrandsOptions)
  }

  const fetchTeamOptions = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/teams`)
    const teams = await response.json();
    const formatedTeamsOptions =  teams.map((team: string) => ({ value: team, label: team }))
    setTeamOptions(formatedTeamsOptions)
  }

  const handleSelectYear = (item: OptionType) => {
    selectYear(item.value);
  };

  const handleSelectGrand = (item: OptionType) => {
    selectGrand(item.value);
  };

  const handleSelectTeam = (item: OptionType) => {
    selectTeam(item.value);
  };

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      selectDriver(e);
  };

  return (
    <div className="f1-racing-filters">
      <FormGroup className="form-group">
        <FormLabel>Driver</FormLabel>
        <Form.Control
          placeholder="Driver"
          aria-label="Driver"
          aria-describedby="basic-addon1"
          onChange={handleDriverChange}
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Team</FormLabel>
        <Select
          placeholder="Team"
          className="f1-select"
          options={teamOptions}
          onChange={handleSelectTeam}
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Year</FormLabel>
        <Select
          placeholder="Year"
          className="f1-select"
          options={yearOptions}
          onChange={handleSelectYear}
        />
      </FormGroup>

      <FormGroup className="form-group">
        <FormLabel>Grand</FormLabel>
        <Select
          placeholder="Grand"
          className="f1-select"
          options={grandOptions}
          onChange={handleSelectGrand}
        />
      </FormGroup>
    </div>
  );
}
