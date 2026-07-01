'use client';

import {
  BellIcon,
  CheckCircle2Icon,
  ChevronDownIcon,
  Layers3Icon,
  PanelTopIcon,
  Settings2Icon,
  ShieldCheckIcon,
  SparklesIcon,
  Table2Icon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { DebouncedInput, NativeSelect, TableActions, TablePaginator } from '@/components/shared';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Input,
  Label,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';

const sections = [
  'Foundation',
  'Actions',
  'Forms',
  'Tables',
  'Navigation',
  'Feedback',
  'Data layer',
];

const workflowRows = [
  { name: 'Customer import', owner: 'Operations', status: 'Ready' },
  { name: 'Invoice review', owner: 'Finance', status: 'Draft' },
  { name: 'Security export', owner: 'Trust', status: 'Queued' },
];

export function ComponentUseCases() {
  const [selectValue, setSelectValue] = useState('weekly');
  const [debouncedValue, setDebouncedValue] = useState('starter');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-10 md:px-10 md:py-14">
        <Hero />

        <ShowcaseSection
          eyebrow="Foundation"
          title="Layout, cards, and status language"
          description="Use cards sparingly for interactive surfaces, keep section copy operational, and use badges for state rather than decoration."
        >
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-gray-200 bg-white/85">
              <CardHeader>
                <CardTitle>Workspace card</CardTitle>
                <CardDescription>
                  A compact surface for summaries, scoped actions, and related state.
                </CardDescription>
                <CardAction>
                  <Badge>Ready</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-3">
                  {['Readable', 'Typed', 'Responsive'].map((item) => (
                    <div key={item} className="rounded-2xl bg-muted px-4 py-3 text-sm font-medium">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-between text-sm text-muted-foreground">
                <span>Use for bounded tasks</span>
                <span>Updated now</span>
              </CardFooter>
            </Card>

            <div className="rounded-[28px] border border-gray-200 bg-white/70 p-5">
              <p className="text-sm font-semibold">Section rhythm</p>
              <div className="mt-5 space-y-4">
                {sections.map((section, index) => (
                  <div key={section} className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{section}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          eyebrow="Actions"
          title="Buttons and badges for clear intent"
          description="Pair one primary action with quieter secondary actions. Use status badges to clarify state without overloading color."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-wrap items-center gap-3 rounded-[28px] border border-gray-200 bg-white/75 p-5">
              <Button>Save changes</Button>
              <Button variant="secondary">Preview</Button>
              <Button variant="outline">Cancel</Button>
              <Button variant="ghost">Reset</Button>
              <Button variant="destructive">Delete</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-[28px] border border-gray-200 bg-white/75 p-5">
              <Badge>Active</Badge>
              <Badge variant="secondary">Draft</Badge>
              <Badge variant="outline">Review</Badge>
              <Badge variant="destructive">Blocked</Badge>
              <Badge variant="ghost">Muted</Badge>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          eyebrow="Forms"
          title="Inputs, labels, selects, and debounced search"
          description="Keep form rows explicit: label the control, describe the behavior, and disable submit paths while work is pending."
        >
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-gray-200 bg-white/85">
              <CardHeader>
                <CardTitle>Create record</CardTitle>
                <CardDescription>Simple form composition with accessible labels.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="showcase-name">Name</Label>
                  <Input id="showcase-name" placeholder="Acme workspace" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="showcase-cadence">Cadence</Label>
                  <NativeSelect
                    id="showcase-cadence"
                    className="w-full"
                    value={selectValue}
                    onChange={setSelectValue}
                    options={[
                      { label: 'Daily', value: 'daily' },
                      { label: 'Weekly', value: 'weekly' },
                      { label: 'Monthly', value: 'monthly' },
                    ]}
                  />
                </div>
                <Button>Submit example</Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white/85">
              <CardHeader>
                <CardTitle>Debounced input</CardTitle>
                <CardDescription>
                  Useful for search fields that should wait before updating the URL or fetching.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="showcase-debounced">Search query</Label>
                  <DebouncedInput
                    id="showcase-debounced"
                    value={debouncedValue}
                    onDebouncedChange={setDebouncedValue}
                    placeholder="Type and pause"
                  />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                  Current debounced value:{' '}
                  <span className="font-medium text-foreground">{debouncedValue}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          eyebrow="Tables"
          title="Data tables, loading rows, and pagination"
          description="Tables should make scanning easy, keep controls close, and preserve pagination/search state in the feature implementation."
        >
          <Card className="border-gray-200 bg-white/85">
            <CardHeader>
              <CardTitle>Operational table</CardTitle>
              <CardDescription>
                Combine table primitives with shared controls for list-heavy product screens.
              </CardDescription>
              <CardAction>
                <TableActions
                  isLoading={false}
                  search={search}
                  searchPlaceholder="Search workflows"
                  onSearchChange={setSearch}
                  onRefresh={async () => {
                    toast.success('Refresh action triggered.');
                  }}
                />
              </CardAction>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Workflow</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflowRows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.owner}</TableCell>
                      <TableCell>
                        <Badge variant={row.status === 'Ready' ? 'default' : 'secondary'}>
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePaginator
                limit={limit}
                page={page}
                total={38}
                visibleCount={workflowRows.length}
                onLimitChange={(nextLimit) => {
                  setLimit(nextLimit);
                  setPage(1);
                }}
                onPageChange={setPage}
              />
            </CardContent>
          </Card>
        </ShowcaseSection>

        <ShowcaseSection
          eyebrow="Navigation"
          title="Tabs, dropdowns, and dialogs"
          description="Use overlays for scoped decisions, menus for secondary actions, and tabs when switching context inside one surface."
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-gray-200 bg-white/85">
              <CardHeader>
                <CardTitle>Tabbed detail panel</CardTitle>
                <CardDescription>Keep related views in one task area.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="pt-4">
                    Summary content, health checks, and current state.
                  </TabsContent>
                  <TabsContent value="settings" className="pt-4">
                    Configuration controls and guarded mutations.
                  </TabsContent>
                  <TabsContent value="activity" className="pt-4">
                    Recent events, audit entries, and background work.
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="grid gap-4 rounded-[28px] border border-gray-200 bg-white/75 p-5">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                  Actions
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Record actions</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Duplicate
                      <DropdownMenuShortcut>D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
                <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm component pattern</DialogTitle>
                    <DialogDescription>
                      Dialogs are best for short decisions where the user should stay in context.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter showCloseButton>
                    <Button>Continue</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          eyebrow="Feedback"
          title="Alerts, skeletons, and toasts"
          description="Make async states visible: tell users what happened, what is loading, and what they can do next."
        >
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-4">
              <Alert>
                <CheckCircle2Icon />
                <AlertTitle>Changes saved</AlertTitle>
                <AlertDescription>
                  Use alerts for persistent page-level state that should remain visible.
                </AlertDescription>
                <AlertAction>
                  <Badge variant="secondary">Info</Badge>
                </AlertAction>
              </Alert>
              <Alert variant="destructive">
                <ShieldCheckIcon />
                <AlertTitle>Action needs review</AlertTitle>
                <AlertDescription>
                  Destructive alerts should explain the blocked action without exposing internals.
                </AlertDescription>
              </Alert>
            </div>
            <Card className="border-gray-200 bg-white/85">
              <CardHeader>
                <CardTitle>Loading and toast states</CardTitle>
                <CardDescription>Use skeletons before content shape is available.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
                <Button
                  className="mt-2"
                  variant="outline"
                  onClick={() => toast.success('Toast feedback is wired through providers.')}
                >
                  Trigger toast
                </Button>
              </CardContent>
            </Card>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          eyebrow="Data layer"
          title="API, config, providers, and query defaults"
          description="The skeleton includes a generic API request wrapper, global feedback events, typed environment access, and React Query defaults."
        >
          <div className="grid gap-4 md:grid-cols-4">
            <FoundationTile icon={PanelTopIcon} title="Providers" text="Wrap app UI once." />
            <FoundationTile icon={Settings2Icon} title="Config" text="Fail fast on missing env." />
            <FoundationTile icon={BellIcon} title="Events" text="Centralize API feedback." />
            <FoundationTile icon={Table2Icon} title="Queries" text="Stable data defaults." />
          </div>
        </ShowcaseSection>
      </section>
    </main>
  );
}

function Hero() {
  return (
    <div className="grid min-h-[72vh] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <header className="max-w-2xl">
        <Badge variant="secondary" className="rounded-full px-3 py-1">
          Component use cases
        </Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] text-foreground md:text-7xl">
          Every skeleton primitive, shown in working context.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
          Use this homepage as the living reference for layout, forms, tables, navigation, feedback,
          and data foundations before adding product modules.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg">Start a surface</Button>
          <Button size="lg" variant="outline">
            Scan sections
          </Button>
        </div>
      </header>

      <div className="relative">
        <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-[36px] border border-gray-200 bg-white/90 p-6 shadow-[0_32px_100px_rgba(15,23,42,0.10)]">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <p className="text-sm font-semibold">Skeleton workspace</p>
              <p className="mt-1 text-sm text-muted-foreground">Sectioned component reference</p>
            </div>
            <Badge>Ready</Badge>
          </div>
          <div className="grid gap-4 py-5 md:grid-cols-2">
            {[
              { icon: Layers3Icon, label: 'Composable UI' },
              { icon: SparklesIcon, label: 'Clean feedback' },
              { icon: Table2Icon, label: 'List workflows' },
              { icon: Settings2Icon, label: 'Data foundation' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl bg-muted p-4">
                <Icon className="size-5 text-primary" />
                <p className="mt-4 text-sm font-medium">{label}</p>
                <Skeleton className="mt-3 h-3 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowcaseSection({
  children,
  description,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="grid gap-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{title}</h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground md:text-base">{description}</p>
      </div>
      {children}
    </section>
  );
}

function FoundationTile({
  icon: Icon,
  text,
  title,
}: {
  icon: typeof PanelTopIcon;
  text: string;
  title: string;
}) {
  return (
    <div className="rounded-[24px] border border-gray-200 bg-white/80 p-5">
      <Icon className="size-5 text-primary" />
      <p className="mt-5 text-sm font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
