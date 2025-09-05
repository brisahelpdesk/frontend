import { useState } from "react"
import {
  ArrowLeft,
  Paperclip,
  X,
  Send,
  CheckCircle,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router"
import { TabsContent } from "@/components/ui/tabs"


export function ClientPortalNewTicket() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    equipment: "",
    priority: "",
    location: "",
    contactPreference: "",
    triedSelfHelp: false,
    selfHelpDetails: "",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachments((prev) => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }


  if (isSuccess) {
    return (
      <TabsContent value="new-ticket" className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border border-slate-200 shadow-lg">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Chamado Criado com Sucesso!</h2>
            <p className="text-slate-600">Seu chamado foi registrado e nossa equipe entrará em contato em breve.</p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Número do Chamado:</strong> #TK-2024-005
              </p>
              <p className="text-sm text-blue-700 mt-1">
                <strong>Tempo estimado de resposta:</strong> 2-4 horas
              </p>
            </div>
            <div className="pt-4 space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                <Link to="/client-portal">Voltar ao Portal</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/client-portal/new-request">Criar Outro Chamado</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    )
  }

  return (
    <TabsContent value="new-ticket" className="min-h-screen bg-slate-50">
      <div className="max-w-7xl w-full">
        <Card className="w-full border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              Vamos identificar seu problema
            </CardTitle>
            <p className="text-slate-600">Primeiro, nos conte qual tipo de problema você está enfrentando</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-700 font-medium">
                  Categoria do Problema *
                </Label>
                <Select onValueChange={(value) => handleInputChange("category", value)} required>
                  <SelectTrigger className="bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hardware">🖥️ Hardware (Computador, Impressora, etc.)</SelectItem>
                    <SelectItem value="software">💻 Software (Programas, Sistemas)</SelectItem>
                    <SelectItem value="network">🌐 Rede/Internet</SelectItem>
                    <SelectItem value="email">📧 Email/Outlook</SelectItem>
                    <SelectItem value="access">🔑 Acessos/Senhas</SelectItem>
                    <SelectItem value="phone">📞 Telefonia</SelectItem>
                    <SelectItem value="other">❓ Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment" className="text-slate-700 font-medium">
                  Equipamento/Sistema Específico *
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("equipment", value)}
                  disabled={!formData.category}
                  required
                >
                  <SelectTrigger className="bg-slate-50 border-slate-200">
                    <SelectValue
                      placeholder={formData.category ? "Selecione o equipamento" : "Primeiro selecione a categoria"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.category === "hardware" && (
                      <>
                        <SelectItem value="desktop">Desktop/Computador</SelectItem>
                        <SelectItem value="laptop">Notebook/Laptop</SelectItem>
                        <SelectItem value="printer">Impressora</SelectItem>
                        <SelectItem value="monitor">Monitor</SelectItem>
                        <SelectItem value="phone">Telefone</SelectItem>
                      </>
                    )}
                    {formData.category === "software" && (
                      <>
                        <SelectItem value="office">Microsoft Office</SelectItem>
                        <SelectItem value="browser">Navegador</SelectItem>
                        <SelectItem value="erp">Sistema ERP</SelectItem>
                        <SelectItem value="antivirus">Antivírus</SelectItem>
                      </>
                    )}
                    {formData.category === "network" && (
                      <>
                        <SelectItem value="internet">Conexão Internet</SelectItem>
                        <SelectItem value="wifi">Wi-Fi</SelectItem>
                        <SelectItem value="vpn">VPN</SelectItem>
                      </>
                    )}
                    {formData.category === "email" && (
                      <>
                        <SelectItem value="outlook">Microsoft Outlook</SelectItem>
                        <SelectItem value="webmail">Webmail</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>        

            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-700 font-medium">
                Descreva brevemente o problema *
              </Label>
              <Input
                id="title"
                placeholder="Ex: Impressora não conecta no Wi-Fi, Computador muito lento..."
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="bg-slate-50 border-slate-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-700 font-medium">
                Descrição Detalhada do Problema *
              </Label>
              <Textarea
                id="description"
                placeholder={`Descreva o problema em detalhes:
  • O que exatamente acontece?
  • Quando começou?
  • Mensagens de erro (se houver)
  • O que você já tentou fazer?`}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="bg-slate-50 border-slate-200 focus:border-blue-500 min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPreference" className="text-slate-700 font-medium">
                Como prefere ser contatado?
              </Label>
              <Select onValueChange={(value) => handleInputChange("contactPreference", value)}>
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Selecione a forma de contato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">📧 Email</SelectItem>
                  <SelectItem value="phone">📞 Telefone</SelectItem>
                  <SelectItem value="whatsapp">💬 WhatsApp</SelectItem>
                  <SelectItem value="teams">💻 Microsoft Teams</SelectItem>
                  <SelectItem value="presencial">👤 Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>

              <div className="space-y-4">
                <Label className="text-slate-700 font-medium">Anexos (Opcional)</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                    <Paperclip className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Clique para adicionar prints ou arquivos</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, PDF, DOC até 10MB cada</p>
                  </Label>
                </div>

                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">Arquivos Anexados:</Label>
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="flex items-center gap-2">
                          <Paperclip className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-700">{file.name}</span>
                          <span className="text-xs text-slate-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
                <Button variant="outline" className="flex-1" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  type="submit"
                  disabled={
                    !formData.description ||
                    !formData.contactPreference ||
                    !formData.title ||
                    isSubmitting
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Criando Chamado...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Criar Chamado
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
      </div>
    </TabsContent>
  )
}