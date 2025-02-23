import { NewReportForm } from '@/components/reports-editor/forms/new-report-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewReportPage() {
  return (
    <div className="py-6">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau Rapport de Prestation</CardTitle>
        </CardHeader>
        <CardContent>
          <NewReportForm />
        </CardContent>
      </Card>
    </div>
  )
}
