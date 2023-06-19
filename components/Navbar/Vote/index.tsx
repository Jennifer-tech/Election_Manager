import { ELECTION_YEAR_ROUTE } from '@/utils/config/urls'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

const Vote = () => {
    const router = useRouter();
    const path = usePathname();

    const isActivePath = useMemo(() => {
        return path === ELECTION_YEAR_ROUTE;
      }, [router]);
  return (
    <Link href={ELECTION_YEAR_ROUTE}
    className='text-blue-950'
    >
        Vote
    </Link>
  )
  
}

export default Vote