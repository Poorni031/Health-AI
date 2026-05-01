import { ClipboardList, Cpu, Utensils, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Share Your Profile',
    description: 'Enter your basic details, lifestyle habits, daily activity levels, food preferences, and medical history.'
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Our AI calculates your BMI, analyzes disease risk factors, and determines your nutritional needs.'
  },
  {
    number: '03',
    icon: Utensils,
    title: 'Get Your Diet Plan',
    description: 'Receive a personalized Indian meal plan with breakfast, lunch, snacks, and dinner recommendations.'
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Track & Improve',
    description: 'Log your daily meals, monitor progress with weekly/monthly reports, and stay motivated.'
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How <span className="text-primary">Health-Ai</span> Works
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Four simple steps to transform your health and nutrition journey.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="absolute left-0 right-0 top-24 hidden h-0.5 bg-border lg:block" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Step Number & Icon */}
                <div className="relative z-10 mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                      <step.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="my-4 h-8 w-0.5 bg-border md:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
