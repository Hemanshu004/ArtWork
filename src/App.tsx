import { useState, useEffect } from 'react';
import { ArtworkTable } from './components/ArtworkTable';
import { SelectionOverlay } from './components/SelectionOverlay';
import { Artwork, ApiResponse } from './types/artwork';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './index.css';

function App() {
  const [rows, setRows] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [deselected, setDeselected] = useState<Set<number>>(new Set());

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=12`)
      .then(r => r.json())
      .then((res: ApiResponse) => {
        setRows(res.data);
        setTotal(res.pagination.total);
        setLoading(false);
      })
      .catch(() => {
        setRows([]);
        setLoading(false);
      });
  }, [page]);

  function getCheckedRows(): Artwork[] {
    const out: Artwork[] = [];
    for (let i = 0; i < rows.length; i++) {
      const id = rows[i].id;
      if (selected.has(id) && !deselected.has(id)) {
        out.push(rows[i]);
      }
    }
    return out;
  }

  function onSelectionChange(newSel: Artwork[]) {
    const ids = new Set(newSel.map(x => x.id));

    for (let i = 0; i < rows.length; i++) {
      const id = rows[i].id;
      if (ids.has(id)) {
        selected.add(id);
        deselected.delete(id);
      } else {
        deselected.add(id);
        selected.delete(id);
      }
    }

    setSelected(new Set(selected));
    setDeselected(new Set(deselected));
  }

  function selectFirst(n: number) {
    for (let i = 0; i < n && i < rows.length; i++) {
      selected.add(rows[i].id);
      deselected.delete(rows[i].id);
    }
    setSelected(new Set(selected));
    setDeselected(new Set(deselected));
  }

  function countSelected(): number {
    let n = 0;
    selected.forEach(id => {
      if (!deselected.has(id)) n++;
    });
    return n;
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Artwork Collection</h1>
      </div>
      
      <div className="toolbar">
        <SelectionOverlay max={rows.length} onSelect={selectFirst} />
        <span className="selection-count">
          {countSelected()} selected
        </span>
      </div>

      <div className="table-wrapper">
        <ArtworkTable
          rows={rows}
          loading={loading}
          total={total}
          page={page}
          checked={getCheckedRows()}
          onPage={setPage}
          onCheck={onSelectionChange}
        />
      </div>
    </div>
  );
}

export default App;
