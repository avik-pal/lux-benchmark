"use client";

import { useState } from "react";
import styled from "styled-components";
import ChartsContainer from "./ChartsContainer";
import TagList from "./TagList";
import TimeSeriesChart from "./TimeSeriesChart";

interface Props {
  data: BenchmarkUpload[];
  filter?: (bc: string[]) => boolean;
}

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

export default function TimeSeries({ data, filter }: Props) {
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
      if (filter && !filter(breadcrumb)) return;
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
      for (const [key, value] of Object.entries(thing.data)) {
        breadcrumb.push(key);
        tags.push(...thing.tags);
        visit(breadcrumb, tags, context, value);
        breadcrumb.pop();
        tags.splice(tags.length - thing.tags.length, thing.tags.length);
      }
    }
  };
  for (const { context, suite } of data) {
    visit([], [], context, suite);
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
      <TagListWrapper>
        <TagListLabel>Filter by tags: </TagListLabel>
        <TagList
          tags={Array.from(allTags).sort()}
          toggleTag={toggleTag}
          selectedTags={selectedTags}
        />
      </TagListWrapper>
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
