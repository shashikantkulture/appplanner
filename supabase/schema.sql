-- ClientFlow Pro schema (run in Supabase SQL editor)

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  created_at timestamptz default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  business_name text not null,
  contact_info text not null,
  status text not null check (status in ('Active', 'Inactive')),
  created_at timestamptz default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  title text not null,
  description text,
  deadline date not null,
  status text not null check (status in ('Pending', 'In Progress', 'Done')),
  created_at timestamptz default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete cascade,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.users enable row level security;
alter table public.clients enable row level security;
alter table public.tasks enable row level security;
alter table public.notifications enable row level security;
alter table public.activity_logs enable row level security;

create policy "users can view own profile" on public.users for select using (auth.uid() = id);
create policy "users can upsert own profile" on public.users for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "clients owner access" on public.clients for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "tasks owner access" on public.tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notifications owner access" on public.notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "activity owner access" on public.activity_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('task-files', 'task-files', false)
on conflict (id) do nothing;
