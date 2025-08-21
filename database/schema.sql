-- Table
create table if not exists connected_art_cards (
  id bigserial primary key,
  name text not null,
  set_name text not null,
  number text not null,
  image_url text not null,
  tcgplayer_url text,
  position_row int not null,  -- 1..3
  position_col int not null,  -- 1..3
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_connected_art_cards_grid
  on connected_art_cards(position_row, position_col);

alter table connected_art_cards enable row level security;

-- Public can read active cards
create policy "public_read_active_cards"
on connected_art_cards for select
to anon, authenticated
using (is_active = true);

-- Keep updated_at fresh
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists trg_connected_art_cards_updated on connected_art_cards;
create trigger trg_connected_art_cards_updated
before update on connected_art_cards
for each row execute function set_updated_at();
