import { STATISTICS_ROUTE } from '@/utils/config/urls'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

const Statistics = () => {
    const router = useRouter();
    const path = usePathname();

    const isActivePath = useMemo(() => {
        return path === STATISTICS_ROUTE;
      }, [router]);
  return (
    <Link 
    href={STATISTICS_ROUTE}
    className='text-blue-950'
    >
        Statistics
    </Link>
  )
}

export default Statistics