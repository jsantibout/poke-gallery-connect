create table if not exists connected_art_cards (
  id serial primary key,
  name text not null,
  set_name text not null,
  number text not null,
  image_url text not null,
  tcgplayer_url text,         -- optionally store the affiliate URL
  position_row int not null,  -- 1..3 for your 3x3
  position_col int not null,  -- 1..3
  is_active boolean not null default true,

  -- housekeeping
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_connected_art_cards_grid
  on connected_art_cards(position_row, position_col);

create index if not exists idx_connected_art_cards_active
  on connected_art_cards(is_active);

-- trigger to keep updated_at fresh (optional)
create or replace function set_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists trg_connected_art_cards_updated on connected_art_cards;
create trigger trg_connected_art_cards_updated
before update on connected_art_cards
for each row execute function set_updated_at();
