import React from "react";
import qs from "qs";

import { formatDate } from "../../../util/";

import styles from "./index.scss";

interface SearchResultsProps {
  count: number;
  onClick: () => void;
}

const SearchResults = ({ count, onClick }: SearchResultsProps) => {
  return (
    <div className={styles.searchResult}>
      <div className={styles.searchResultHeader}>
        <p>{`${count} Results`}</p>
        <button onClick={onClick}>CLEAR SEARCH</button>
      </div>
      <p className={styles.searchResultText}>
        {getSearchResultText(location.search)}
      </p>
    </div>
  );
};

export default SearchResults;

function getSearchResultText(search: string) {
  const params = qs.parse(search, { ignoreQueryPrefix: true });
  let result = `Searched for ${params.chn || ""} Activites`;
  if (params.sDate && params.eDate) {
    result = `${result} from ${formatDate(
      new Date(params.sDate.toString() || ""),
      "d/m"
    )} to ${formatDate(new Date(params.eDate.toString() || ""), "d/m")}`;
  }
  return result;
}
