
import React, { useState, ChangeEvent } from 'react';
import { GiftIcon, SettingsIcon, ShieldCheckIcon, LinkIcon, MegaphoneIcon, CreditCardIcon, TrashIcon, PlusIcon } from '../../../components/icons';

type SettingsTab = 'general' | 'rewards' | 'monetization' | 'api' | 'security';
type AdPosition = 'home_top_banner' | 'video_feed_interstitial' | 'earn_page_banner' | 'profile_banner' | 'popup';

interface Ad {
  id: number;
  position: AdPosition;
  code: string;
  enabled: boolean;
}

const adPositionLabels: Record<AdPosition, string> = {
  home_top_banner: 'Banner no Topo da Home',
  video_feed_interstitial: 'Dentro do Feed de Vídeos (a cada X vídeos)',
  earn_page_banner: 'Banner na Página de Ganhos',
  profile_banner: 'Banner na Página de Perfil',
  popup: 'Popup Inicial',
};

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const addNewAd = () => {
    const newAd: Ad = {
      id: Date.now(),
      position: 'home_top_banner',
      code: '',
      enabled: true,
    };
    setAds([...ads, newAd]);
  };

  const updateAd = (id: number, field: keyof Ad, value: any) => {
    setAds(ads.map(ad => ad.id === id ? { ...ad, [field]: value } : ad));
  };

  const removeAd = (id: number) => {
    setAds(ads.filter(ad => ad.id !== id));
  };


  const TabButton: React.FC<{ tab: SettingsTab; label: string; icon: React.ReactNode }> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-4 py-3 font-semibold border-b-2 transition-colors duration-200 ${
        activeTab === tab 
          ? 'border-primary-500 text-primary-500' 
          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-primary-500 hover:border-primary-500/50'
      }`}
    >
      {icon}
      <span className="ml-2 hidden sm:inline">{label}</span>
    </button>
  );

  const FormGroup: React.FC<{ label: string; helpText?: string; children: React.ReactNode }> = ({ label, helpText, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        {children}
        {helpText && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helpText}</p>}
    </div>
  );

  const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button
      type="button"
      className={`${
        enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </button>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Configurações Avançadas</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700 flex flex-wrap">
          <TabButton tab="general" label="Geral" icon={<SettingsIcon className="w-5 h-5"/>} />
          <TabButton tab="rewards" label="Recompensas" icon={<GiftIcon className="w-5 h-5"/>} />
          <TabButton tab="monetization" label="Monetização" icon={<MegaphoneIcon className="w-5 h-5"/>} />
          <TabButton tab="api" label="API & Integrações" icon={<LinkIcon className="w-5 h-5"/>} />
          <TabButton tab="security" label="Segurança" icon={<ShieldCheckIcon className="w-5 h-5"/>} />
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Dados do App</h2>
              <FormGroup label="Nome do App" helpText="O nome que será exibido em todo o aplicativo.">
                <input type="text" defaultValue="CASHVIRAL" className="mt-1 w-full max-w-lg p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
              </FormGroup>
              <FormGroup label="Logo do App" helpText="Faça upload de um arquivo de imagem (PNG, JPG, SVG).">
                <div className="flex items-center space-x-4">
                  {logoPreview && <img src={logoPreview} alt="Preview" className="w-16 h-16 object-contain rounded-md bg-gray-100 dark:bg-gray-700"/>}
                  <input type="file" onChange={handleLogoChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                </div>
              </FormGroup>
              <FormGroup label="Política de Privacidade (URL)" helpText="Link para a página com sua política de privacidade.">
                <input type="url" placeholder="https://seu-site.com/politica" className="mt-1 w-full max-w-lg p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
              </FormGroup>
            </div>
          )}

          {activeTab === 'rewards' && (
             <div className="space-y-6">
              <h2 className="text-xl font-bold">Recompensas & Limites</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup label="Valor por vídeo assistido (R$)" helpText="Quanto um usuário ganha ao assistir um vídeo completo.">
                  <input type="number" defaultValue="0.10" step="0.01" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </FormGroup>
                <FormGroup label="Tempo mínimo de exibição (segundos)" helpText="Tempo necessário para o vídeo contar como assistido.">
                  <input type="number" defaultValue="30" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </FormGroup>
                <FormGroup label="Bônus de Login Diário (R$)" helpText="Valor ganho pelo usuário ao entrar no app a cada 24h.">
                    <input type="number" defaultValue="0.50" step="0.01" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </FormGroup>
                <FormGroup label="Bônus por Convite (R$)" helpText="Valor que o usuário e o convidado ganham.">
                    <input type="number" defaultValue="5.00" step="0.01" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </FormGroup>
                <FormGroup label="Saque Mínimo (R$)" helpText="Valor mínimo que o usuário precisa ter para solicitar um saque.">
                    <input type="number" defaultValue="20.00" step="0.01" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </FormGroup>
                 <FormGroup label="Limite Diário de Saque por Usuário (R$)" helpText="Valor máximo que um usuário pode sacar por dia.">
                    <input type="number" defaultValue="100.00" step="0.01" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </FormGroup>
              </div>
            </div>
          )}

           {activeTab === 'monetization' && (
            <div className="space-y-8">
              <div className="p-4 border rounded-lg dark:border-gray-700">
                <h2 className="text-xl font-bold mb-4 flex items-center"><CreditCardIcon className="w-6 h-6 mr-2 text-primary-500" />Gateways de Pagamento</h2>
                <div className="space-y-4">
                    {['Mercado Pago', 'PagBank', 'Stripe', 'PayPal'].map(gw => (
                         <div key={gw} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <ToggleSwitch enabled={true} onChange={() => {}} />
                                <span className="ml-3 font-semibold">{gw}</span>
                            </div>
                            <input type="password" placeholder={`Chave API do ${gw}`} className="w-full sm:w-1/2 p-2 text-sm border rounded-md dark:bg-gray-900 dark:border-gray-600" />
                        </div>
                    ))}
                </div>
              </div>
              
              <div className="p-4 border rounded-lg dark:border-gray-700">
                <h2 className="text-xl font-bold mb-4">Google AdSense</h2>
                <div className="flex items-center justify-between">
                  <FormGroup label="Ativar integração com AdSense">
                    <ToggleSwitch enabled={false} onChange={() => {}} />
                  </FormGroup>
                  <div className="w-1/2">
                    <FormGroup label="Seu ID de Editor (pub-xxxxxxxxxxxxxxxx)">
                        <input type="text" placeholder="pub-..." className="w-full p-2 text-sm border rounded-md dark:bg-gray-900 dark:border-gray-600" />
                    </FormGroup>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg dark:border-gray-700">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Anúncios Customizados</h2>
                    <button onClick={addNewAd} className="flex items-center bg-primary-600 text-white px-3 py-2 text-sm rounded-md hover:bg-primary-700">
                        <PlusIcon className="w-4 h-4 mr-1"/>
                        Adicionar Anúncio
                    </button>
                 </div>
                 <div className="space-y-4">
                    {ads.map((ad, index) => (
                        <div key={ad.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold">Anúncio #{index + 1}</span>
                                <div className="flex items-center space-x-4">
                                    <ToggleSwitch enabled={ad.enabled} onChange={(val) => updateAd(ad.id, 'enabled', val)} />
                                    <button onClick={() => removeAd(ad.id)} className="text-red-500 hover:text-red-700">
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium">Posição do Anúncio</label>
                                    <select value={ad.position} onChange={(e) => updateAd(ad.id, 'position', e.target.value)} className="w-full p-2 text-sm border rounded-md dark:bg-gray-900 dark:border-gray-600 mt-1">
                                        {Object.entries(adPositionLabels).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium">Código do Anúncio (HTML/JS)</label>
                                    <textarea value={ad.code} onChange={(e) => updateAd(ad.id, 'code', e.target.value)} rows={3} placeholder="<script>...</script>" className="w-full p-2 text-sm border rounded-md dark:bg-gray-900 dark:border-gray-600 mt-1 font-mono"></textarea>
                                </div>
                             </div>
                        </div>
                    ))}
                    {ads.length === 0 && <p className="text-center text-gray-500 py-4">Nenhum anúncio customizado adicionado.</p>}
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
             <div className="space-y-6">
              <h2 className="text-xl font-bold">API Keys & Integrações</h2>
              <FormGroup label="YouTube API Key" helpText="Necessária para buscar informações de vídeos e playlists do YouTube.">
                <input type="password" placeholder="••••••••••••••••••••" className="mt-1 w-full max-w-lg p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
              </FormGroup>
              <FormGroup label="Gemini AI API Key" helpText="Usada para a funcionalidade de recomendação de vídeos baseada em IA.">
                <input type="password" placeholder="••••••••••••••••••••" className="mt-1 w-full max-w-lg p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
              </FormGroup>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Segurança</h2>
               <FormGroup label="Modo Manutenção" helpText="Desativa o acesso ao aplicativo para usuários (administradores continuam com acesso).">
                 <div className="flex items-center space-x-4">
                    <ToggleSwitch enabled={false} onChange={() => {}}/>
                    <span>Ativar Modo Manutenção</span>
                 </div>
              </FormGroup>
               <FormGroup label="Mensagem de Manutenção" helpText="Mensagem que será exibida para os usuários quando o modo manutenção estiver ativo.">
                <input type="text" placeholder="Voltamos em breve com novidades!" className="mt-1 w-full max-w-lg p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
              </FormGroup>
               <FormGroup label="Autenticação de Dois Fatores (2FA) para Admin" helpText="Adiciona uma camada extra de segurança para o login de administradores.">
                 <div className="flex items-center space-x-4">
                    <ToggleSwitch enabled={false} onChange={() => {}}/>
                    <span>Exigir 2FA</span>
                 </div>
              </FormGroup>
            </div>
          )}
        </div>
      </div>
      
       <div className="flex justify-end mt-8">
            <button className="bg-primary-600 text-white font-bold px-8 py-3 rounded-md hover:bg-primary-700 shadow-lg transition-all">
                Salvar Todas as Alterações
            </button>
        </div>
    </div>
  );
};

export default SettingsPage;
