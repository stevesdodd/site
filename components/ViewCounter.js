import { mergeClasses } from '@/lib/utils';
import { useFirebase } from '@/lib/use-firebase';
import { useEffect, useState } from 'react';

export default function ViewCounter({ id, className, shouldIncrement = false }) {
  const [views, loading, setViews] = useFirebase('page-views', id);
  const [incremented, setIncremented] = useState(false);

  useEffect(() => {
    if (!loading && shouldIncrement && !incremented) {
      console.log(`setting views to ${views + 1}`);
      setViews(views + 1);
      setIncremented(true);
    }
  }, [loading, views, incremented, shouldIncrement]);

  const label = views === 1 ? 'view' : 'views';

  return (
    <span className={mergeClasses('text-gray-600 text-sm', className)}>
      {loading ? '...' : `${Number(views).toLocaleString()} ${label}`}
    </span>
  );
}