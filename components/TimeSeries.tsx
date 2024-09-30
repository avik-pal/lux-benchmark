import { useState } from "react";
import styled from "styled-components";
import ChartsContainer from "./ChartsContainer";
import TagList from "./TagList";
import TimeSeriesChart from "./TimeSeriesChart";
import SeriesNavigator from "./SeriesNavigator";

function isLeaf(thing: BenchmarkGroup | TrialEstimate): thing is TrialEstimate {
  return "time" in thing;
}

const TagListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const TagListLabel = styled.label`
  padding-right: 16px;
`;

export default function TimeSeries({
  series,
  tagged,
  branchLookup,
  handler,
}: {
  series: string;
  tagged: Benchmark[];
  branchLookup: Map<string, Benchmark[]>;
  handler: (s: string) => void;
}) {
  const data = series === "tagged" ? tagged : branchLookup.get(series)!;
  const [selectedTags, setSelectedTags] = useState(new Set<string>());
  const breadcrumbMap = new Map<
    string,
    {
      tags: Set<string>;
      contexts: BenchmarkContext[];
      series: TrialEstimate[];
    }
  >();

  const visit = (
    breadcrumb: string[],
    tags: string[],
    context: BenchmarkContext,
    thing: BenchmarkGroup | TrialEstimate
  ) => {
    if (isLeaf(thing)) {
      const path = breadcrumb.join(".");
      if (!breadcrumbMap.has(path)) {
        breadcrumbMap.set(path, { tags: new Set(), contexts: [], series: [] });
      }
      const lists = breadcrumbMap.get(path)!;
      for (const tag of tags) {
        lists.tags.add(tag);
      }
      lists.contexts.push(context);
      lists.series.push(thing);
    } else {
      for (const item of thing.data) {
        const { name } = item;
        breadcrumb.push(name);
        tags.push(...thing.tags);
        visit(breadcrumb, tags, context, item);
        breadcrumb.pop();
        tags.splice(tags.length - thing.tags.length, thing.tags.length);
      }
    }
  };
  for (const { result, ...context } of data) {
    visit([], [], context, { name: "", tags: [], data: result });
  }

  const allTags = new Set<string>();
  for (const v of breadcrumbMap.values()) {
    for (const t of v.tags) {
      allTags.add(t);
    }
  }

  const toggleTag = (t: string) => {
    const copy = new Set(selectedTags);
    copy.has(t) ? copy.delete(t) : copy.add(t);
    setSelectedTags(copy);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <SeriesNavigator
          allSeries={Array.from(branchLookup.keys()).concat(["tagged"])}
          series={series}
          handler={handler}
        />
        <TagListWrapper>
          <TagListLabel>Filter by tags: </TagListLabel>
          <TagList
            tags={Array.from(allTags).sort()}
            toggleTag={toggleTag}
            selectedTags={selectedTags}
          />
        </TagListWrapper>
      </div>
      <ChartsContainer>
        {Array.from(breadcrumbMap.entries())
          .filter(([breadcrumb, v]) => {
            return Array.from(selectedTags).every((t) => v.tags.has(t));
          })
          .map(([breadcrumb, v]) => (
            <TimeSeriesChart
              key={breadcrumb}
              breadcrumb={breadcrumb}
              toggleTag={toggleTag}
              selectedTags={selectedTags}
              {...v}
            />
          ))}
      </ChartsContainer>
    </>
  );
}
