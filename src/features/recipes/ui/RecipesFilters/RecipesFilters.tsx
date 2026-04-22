import "./RecipesFilters.css";

type RecipesFiltersProps = {
  searchValue: string;
  selectedTag: string;
  tags?: string[];
  searchPlaceholder: string;
  clearLabel: string;
  tagLabel: string;
  allTagsLabel: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onTagChange: (value: string) => void;
};

export const RecipesFilters = ({
  searchValue,
  selectedTag,
  tags,
  searchPlaceholder,
  clearLabel,
  tagLabel,
  allTagsLabel,
  onSearchChange,
  onClearSearch,
  onTagChange,
}: RecipesFiltersProps) => {
  return (
    <div className="recipes__filtering">
      <div className="recipes__search">
        <div className="recipes__search-wrapper">
          <input
            className="recipes__search-input"
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
          />

          {searchValue && (
            <button
              type="button"
              className="recipes__search-clear"
              onClick={onClearSearch}
              aria-label={clearLabel}
            >
              ×
            </button>
          )}
        </div>

        {tags && (
          <div className="recipes__select-tags">
            <label htmlFor="recipes__tags" className="recipes__select-label">
              {tagLabel}
            </label>

            <div className="recipes__select-wrapper">
              <select
                name="recipes__tags"
                id="recipes__tags"
                className="recipes__select"
                value={selectedTag}
                onChange={(event) => onTagChange(event.target.value)}
              >
                <option value="">{allTagsLabel}</option>

                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
