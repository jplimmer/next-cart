import { SearchBar } from '@/components/search/search-bar';
import { navigateToSearchedItem } from '@/lib/actions/search';

export default function SearchPage() {
  return (
    <main className="full-width place-items-center py-8">
      <div className="w-1/2 border-1 rounded-xl shadow-md p-8">
        <SearchBar searchAction={navigateToSearchedItem} />
      </div>
    </main>
  );
}
