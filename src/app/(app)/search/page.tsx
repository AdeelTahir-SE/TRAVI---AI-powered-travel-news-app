'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchCardsSection from "@/components/searchCardsSection";
import SearchHeroSectoion from "@/components/searchHeroSection";
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection";
import { Hotel } from "@/utils/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all';
  const location = searchParams.get('location') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const sortBy = searchParams.get('sortBy') || '';

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (type && type !== 'all') params.append('type', type);
        if (location) params.append('location', location);
        if (sortBy) params.append('sortBy', sortBy);
        params.append('page', page.toString());
        params.append('limit', '12');

        const response = await fetch(`/api/hotels?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }

        const data = await response.json();
        setHotels(data.hotels || []);
        setTotalCount(data.total || data.hotels?.length || 0);
        setTotalPages(data.totalPages || Math.ceil((data.total || data.hotels?.length || 0) / 12));
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError('Failed to load hotels');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [query, type, location, page, sortBy]);

  return (
    <div className="flex flex-col items-center justify-center">
      <SearchHeroSectoion results={hotels} query={query.toString()} />
      <SearchCardsSection
        hotels={hotels}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
      />
      <ShalimarWithAboveSection />
    </div>
  );
}

