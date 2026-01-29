import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Artwork } from '../types/artwork';

interface Props {
  rows: Artwork[];
  loading: boolean;
  total: number;
  page: number;
  checked: Artwork[];
  onPage: (p: number) => void;
  onCheck: (sel: Artwork[]) => void;
}

export function ArtworkTable({ rows, loading, total, page, checked, onPage, onCheck }: Props) {

  function handlePage(e: DataTablePageEvent) {
    const p = Math.floor(e.first / 12) + 1;
    onPage(p);
  }

  function renderText(row: Artwork, key: keyof Artwork) {
    const v = row[key];
    if (v === null || v === undefined) return <span style={{ color: '#999' }}>—</span>;
    const s = String(v);
    if (s.length > 80) return <span title={s}>{s.substring(0, 80)}...</span>;
    return s;
  }

  return (
    <DataTable
      value={rows}
      lazy
      paginator
      rows={12}
      totalRecords={total}
      first={(page - 1) * 12}
      onPage={handlePage}
      loading={loading}
      selection={checked}
      onSelectionChange={(e) => onCheck(e.value as Artwork[])}
      selectionMode="multiple"
      dataKey="id"
      emptyMessage="No artworks found"
      rowHover
      stripedRows
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
      <Column field="title" header="Title" body={r => renderText(r, 'title')} style={{ minWidth: '200px' }} />
      <Column field="place_of_origin" header="Origin" body={r => renderText(r, 'place_of_origin')} />
      <Column field="artist_display" header="Artist" body={r => renderText(r, 'artist_display')} style={{ minWidth: '180px' }} />
      <Column field="inscriptions" header="Inscriptions" body={r => renderText(r, 'inscriptions')} />
      <Column field="date_start" header="Start" style={{ width: '80px' }} />
      <Column field="date_end" header="End" style={{ width: '80px' }} />
    </DataTable>
  );
}
