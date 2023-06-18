import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import debounce from "lodash/debounce";
import { ResultItem } from "@/types";
import F1DataTable from "@/components/F1DataTable";
import F1Pagination from "@/components/F1Pagination";
import F1RacingResultsFilters from "./F1RacingResultsFilters";
import F1RacingResultsTeamChart from "./F1RacingResultsTeamChart";
import "./F1RacingResults.scss";

export interface IF1RacingResultsProps {}

export default function F1RacingResults(props: IF1RacingResultsProps) {
  const [items, setItems] = useState<ResultItem[]>([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedYear, setSelectedYear] = useState<
    number | string | undefined | null
  >(null);
  const [selectedGrand, setSelectedGrand] = useState<string | undefined | null>(
    null
  );
  const [selectedTeam, setSelectedTeam] = useState<string | undefined | null>(
    null
  );
  const [selectedDriver, setSelectedDriver] = useState<
    string | undefined | null
  >(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (
    page: number = 1,
    year: number | string | undefined | null = undefined,
    grand: string | undefined | null = undefined,
    team: string | undefined | null = undefined,
    driver: string | undefined | null = undefined
  ) => {
    const stringUrl = `${process.env.REACT_APP_BASE_API_URL}/data`;
    console.log(stringUrl)
    const url = new URL(stringUrl);
    const params = url.searchParams;
    params.append("_limit", "20");
    page && params.append("_page", page.toString());
    year && params.append("year", year.toString());
    grand && params.append("grand", grand);
    team && params.append("car", team);
    driver && params.append('driverFullName_like', driver);

    const response = await fetch(url.toString());
    const docs = Number.parseInt(response.headers.get("X-Total-Count") || "0");
    setTotalDocs(docs);

    const data: ResultItem[] = await response.json();
    setItems(data);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page, selectedYear, selectedGrand, selectedTeam, selectedDriver);
  };

  const onYearChange = (year: string | number) => {
    setSelectedYear(year);
    fetchData(currentPage, year, selectedGrand, selectedTeam, selectedDriver);
  };

  const onGrandChange = (grand: string) => {
    setSelectedGrand(grand);
    if (grand.toLowerCase() === 'all') {
      fetchData(currentPage, selectedYear, grand, selectedTeam, selectedDriver);
    } else {
      fetchData(currentPage, selectedYear, grand, selectedTeam, selectedDriver);
    }
  };

  const onTeamChange = (team: string) => {
    setSelectedTeam(team);
    fetchData(currentPage, selectedYear, selectedGrand, team, selectedDriver);
  };

  const onDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const driver = e.target.value;
    setSelectedDriver(driver);
    fetchData(currentPage, selectedYear, selectedGrand, selectedTeam, driver);
  };

  const debounceOnDriverChange = debounce(onDriverChange, 500);

  return (
    <Container className="f1-racing-results">
      <Row>
        <Col sm="12">
          <h1>F1 racing results</h1>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <F1RacingResultsFilters
            selectYear={onYearChange}
            selectGrand={onGrandChange}
            selectTeam={onTeamChange}
            selectDriver={debounceOnDriverChange}
          />
        </Col>
      </Row>
      {/* <Row>
        <Col sm="12">
          <F1BarChart />
        </Col>
      </Row> */}
      {
        selectedTeam && selectedYear &&
        <Row>
          <Col sm="12">
            <F1RacingResultsTeamChart
              team={selectedTeam}
              year={selectedYear}
            />
          </Col>
        </Row>
      }
      <Row>
        <Col sm="12">
          <F1DataTable
            fields={[
              {
                name: "no",
                label: "No",
              },
              {
                name: "driver",
                label: "Driver",
                formatData: (item: ResultItem) => {
                  return `${item.driverFirstName} ${item.driverLastName}`;
                },
              },
              {
                name: "car",
                label: "Team",
                formatData: (item: ResultItem) => {
                  return `${item.car}`;
                },
              },
              {
                name: "year",
                label: "Year",
                formatData: (item: ResultItem) => {
                  return `${item.year}`;
                },
              },
              {
                name: "grand",
                label: "Grand",
                formatData: (item: ResultItem) => {
                  return `${item.grand}`;
                },
              },
            ]}
            items={items}
          />
          <F1Pagination
            totalDocs={totalDocs}
            docsPerpage={20}
            onSelect={onPageChange}
          />
        </Col>
      </Row>
    </Container>
  );
}
