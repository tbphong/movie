import React from "react";

export interface themeTypes {
  title: string;
  icon: IconType;
}

export interface navLinkType extends themeTypes {
  path: string;
}

export interface moviesSlideProps {
  movies: any;
  category: string;
}

export interface sectionPropsType {
  title: string;
  category: string;
  className?: string;
  type?: string;
  id?: number;
  showSimilarShows?: boolean;
}

export interface getShowsPropsType {
  type?: string;
  page?: number;
  searchQuery?: string;
  showSimilarShows?: boolean;
  id?: number;
}

export interface skelatonLoaderPropsTypes {
  className?: string;
  isMoviesSliderLoader?: boolean;
}

export interface getShowPropsType {
  id: string;
}

export interface sectionsType {
  category: string;
  type: string;
  title: string;
}


