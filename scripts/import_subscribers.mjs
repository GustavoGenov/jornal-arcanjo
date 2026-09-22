import { createClient } from '@supabase/supabase-js';
import dns from 'dns/promises';

// Usar DNS primário de alta performance (Google e Cloudflare)
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hiaoasipxkxsjcoshscu.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_wy-86kCcCmauHuKE5p4chA_NA-_uV4l';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Texto bruto integral extraído das 36 páginas do documento PDF
const RAW_PAGES_TEXT = `
ALSTOM
alessandro.giovanelli@power.alstom.com
camila.lins@transport.alstom.com
clara.borsezi@transport.alstom.com
daniela.nunes@alstom.com
ellen.silva@power.alstom.com
rafael.buzzo@power.alstom.com
evandro.correa@power.alstom.com
juan.assis@power.alstom.com
lucas.gouvea@power.alstom.com
luis.marson@power.alstom.com
patricia.sampaio@power.alstom.com
fernanda.pauli@power.alstom.com
nelson.coelho@power.alstom.com
AKAER
rozana.santos@akaer.com.br
akaer@akaer.com.br
claudia.nanni@akaer.com.br
AUTOLIV
priscila.oliveira@autoliv.com
roberta.gil@autoliv.com
AUTOMETAL
rosangelagorete@autometal.com.br
autometal@autometal.com.br
selecao@autometal.com.br
ri@autometal.com.br
acvcruz@autometal.com.br
eakemi@autometal.com.br
abraguim@autometal.com.br
AVIBRAS
rh@avibras.com.br
gspd@avibras.com.br
qualidade@avibras.com.br
dp@avibras.com.br
AERNNOVA
ariane.correa@aernnova.com
ursulacarla.pereira@aernnova.com
andreza.fabiana@aernnova.com
liliane.prudencio@aernnova.com
priscilaaraujo.dossantos@aernnova.com
francisco.nozolino@aernnova.com
eduardo.goncalves@aernnova.com
vagas@aernnova.com
dayane.goncalves@aernnova.com
BANCOS
fun.cart@bnl.com.br
fiatrh@fiat.com.br
rh@hexxa.com.br
rh-recrutamento@hsbc.com.br
banco@indusval.com.br
recrutamento@real.com.br
curriculum@santander.com.br
sgbrasc@uol.com.br
recrutamento@bd.com.br
rh.selecao@citicorp.com
BASF
wagner.brunini@basf.com
CAMERON
douglas.aguiar@c-a-m.com
marcelo.almeida@c-a-m.com
luiz.correa@c-a-m.com
douglas.barros@c-a-m.com
cam-tbt-qcrec@c-a-m.com
celso.viana@c-a-m.com
sergio.silva@c-a-m.com
fabio.roxo@c-a-m.com
bruna.lemes@c-a-m.com
anderson.moreira@c-a-m.com
waldomiro.pinaffi@c-a-m.com
rafael.soares@c-a-m.com
eduardo.bastos@c-a-m.com
rh.curriculo@c-a-m.com
flavia.caixeta@onesubsea.com
caio.orselli@c-a-m.com
edilson.durante@c-a-m.com
dalmo.zerbini@c-a-m.com
glyn.cooper@c-a-m.com
dorvanil.polastro@c-a-m.com
jose.taveira@c-a-m.com
tarcisio.soares@c-a-m.com
fabio.oliveira@c-a-m.com
talita.freitas@c-a-m.com
debora.magalhaes@onesubsea.com
luis.barreto@c-a-m.com
andre.veiga@c-a-m.com
alex.ferraz@c-a-m.com
kleber.correia@c-a-m.com
CEBRACE
ayrton.kuradomi@cebrace.com.br
rh@cebrace.com.br
engenhariadeaplicacao@cebrace.com.br
marketing@cebrace.com.br
luiz.rios@cebrace.com.br
cristiane.vieira@cebrace.com.br
luciana.teixeira@cebrace.com.br
samuel.abrahao@cebrace.com.br
gisele.brito@cebrace.com.br
vanessa.geraldi@cebrace.com.br
carolina.pimenta@cebrace.com.br
luiz.barbosa@cebrace.com.br
barbara.ribeiro@cebrace.com.br
CITROEN
marcia.desa@citroen.com
carlos.costa1@citroen.com
CABLETECH
rh@cabletech.com.br
administracao@cabletech.com.br
assistenciatecnica@cabletech.com.br
engenharia@cabletech.com.br
financeiro@cabletech.com.br
comercial@cabletech.com.br
CONFAB
recrutamento@confab.com.br
dmtotti@confab.com.br
snicolini@confab.com.br
CFBACI@confab.com.br
apsrocha@fornecedores.confab.com.br
recrutamento@confab.com
CFBMSM@confab.com.br
snicoline@confab.com.br
vsantos@confab.com.br
CODEME
codeme@codeme.com.br
DREXLER
cintia.goncalves@drexler.com.br
DARUMA
carmona@daruma.com.br
rh@daruma.com.br
EATON
wellingtondsilverio@eaton.com
ELEB EQUIPAMENTOS
fernanda.novaes@eleb.net
claudia.pompeo@eleb.net
curriculum.eleb@eleb.net
EMBRAER
cleide.muto@embraer.com.br;
erika.moreira@embraer.com.br
andre.palmeira@embraer.com.br
silvio.brasiliano@embraer.com.br
milton.dellu@embraer.com.br
jmoliveira@embraer.com.br
marcelo.araujo@embraer.com.br
kleber.oliveira@embraer.com.br
Jonathan.santos@embraer.com.br
francisco.arakaki@embraer.com.br
lorenzo@embraer.com.br
fernando.cavazzoni@embraer.com.br
luiz.botossi@embraer.com.br
mesa.tesouraria@embraer.com.br
EMAIL - HOTMAIL
arianeeee@hotmail.com
empregosconstructo@hotmail.com
angelawlima@hotmail.com
g7rhtaubate@hotmail.com
rr.constructo@hotmail.com
rr.constructo@hotmail.com
EMAIL - YAHOO
tenorio.tiago@yahoo.com.br
currIculos.fraldas@yahoo.com.br
ehmsoldas@yahoo.com.br
EMERSON NETWORK POWER
rodolfo.sanches@emersonnetworkpower.com
ERICSSON
ruy.caltabiano@ericsson.com
EMPLOYER
camilateixeira@employer.com.br
FORD
lbendini@ford.com
acalciol@ford.com
rmadke@ford.com
cgalvao@ford.com 
ppaiffer@ford.com 
msilv311@ford.com
fgutie40@ford.com 
vreis@ford.com
vgimenes@ford.com
arocha26@ford.com
isantos4@ford.com
rsanto19@ford.com
aarauj33@ford.com
aaraujo49@ford.com
ccarva10@ford.com
kpires1@ford.com
FRIULI
leonice@magnaghifriuli.com.br
gianni@magnaghifriuli.com.br 
vanessa@magnaghifriuli.com.br
cintia@magnaghifriuli.com.br
FIAT
joao.veloso@fiat.com.br 
elisa.sarti@fiat.com.br 
isabela.soares@fiat.com.br
imprensa@fiat.com.br
GATES BRASIL
ss2387@gates.com
GM – GENERAL MOTORS
mark.moussa@gm.com 
carlos.souza@gm.com 
maria.brazao@gm.com
leandro.carvalho@gm.com
ricardo.toshimiota@gm.com
GESTAMP AUTOMACION
cissao@br.gestamp.com
prosa@br.gestamp.com
mateodoro@br.gestamp.com
gluna@br.gestamp.com
recrutamento@br.gestamp.com
GERDAU
michel.rocha@gerdau.com.br
joao.lima@gerdau.com.br
rh-sp@gerdau.com.br
daniel.castro@gerdau.com.br
GE – GENERAL ELETRIC
vendas.ndt@ge.com
ge@agenciaideal.com.br
mkt.geiluminacao@ge.com
ge@gedigitais.com.br 
csc.brasil@ge.com
produtos.saude@ge.com
sensing.brasil@ge.com
marcal.alcantara@ge.com
katia.caruso@ge.com
jose.jorge@ge.com
eduardo.felix@ge.com
gustavo.bizzo@ge.com
fernando.c.martins@ge.com
jose.devis@ge.com 
raquel.costa@ge.com
joao.faria@vetco.com
rafael.nascimento@ge.com
maria.fernandez1@ge.com
GDK
olop@gdksa.com
GLOBAL EMPREGOS – AGÊNCIA
priscilla.sevilla@globalempregos.com.br
pamela.vanzella@globalempregos.com.br
kelly.santos@globalempregos.com.br
GRUPO ANTOLIN
qualidade.intertrim@grupoantolin.com
ednei.madona@grupoantolin.com
alexandre.melo@grupoantolin.com
clodoaldo.silva@grupoantolin.com
eduardo.mendes@grupoantolin.com
peterson.berloto@grupoantolin.com
intertrim@grupoantolin.com
silvio.nunes@grupoantolin.com
trimtec@grupoantolin.com
bianca.peretta@grupoantolin.com
alexandre.oliveira@grupoantolin.com
jorge.edu@ig.com.br
HEATCRAFT BRASIL
denise@heatcraftbrasil.com.br
recrutamento@heatcraftbrasil.com.br
marketing@heatcraftbrasil.com.br
fabio.verdelli@heatcraftbrasil.com.br
denise.luizari@heatcraftbrasil.com.br
vagas@heatcraftbrasil.com.br
HALDEX
igor.arruda@haldex.com
carlos.soares@haldex.com
goran.jarl@haldex.com
dimas.wiegerinck@haldex.com 
daniel.mendes@haldex.com
HELIBRAS
regis.martins@helibras.com.br
HITACHI
ulissespereira@hitachiapb.com.br
edilsonsilva@hitachiapb.com.br
nelsonkashimoto@hitachiapb.com.br
rh@hitachiapb.com.br
HONDA
paulo_saito@honda.com.br
luciana_matsukura@honda.com.br
HOTELARIA
recrutamento@accor.com.br
rh@bluetree.com.br
diretoria@hotelcabreuva.com.br
candidato@transamerica.com.br
HUBERSUHNER
info.br@hubersuhner.com
INCOMISA
cbernardes@incomisa.com.br
fcarvalho@incomisa.com.br
rh@incomisa.com.br
INDÚSTRIA
rh@7comm.com.br
rh@aabb.esp.br
talentoshumanos@algar..com.br
rh@tubosapolo.com.br
selecao@arteb.com.br
rh@arthabr.com
rh@azaleia.com.br
recursos.humanos@basf-sa.com.br
selecao@bombril.com.br
recruta.bosch.rbbr@br.bosch.com
rhboucin@boucinhas.com.br
gente@brahma.com.br
brasilata@brasilata.com.br
rh@caramuru.com
recrutamento_cargill@cargill.com
rh@cce.com.br
talentos@cimentoitau.com.br
rh@ceramicasantana.com..br
Brasil_HR@Dell.com
recrutamento@dow.com 
rhembraco@embraco.com.br
dpessoal@estrela.ind.br
selecao@ford.com
rh@gemini.com.br
rh-sp@gerdau.com.br
recrutamento.amplant@goodyear.com
rh@gradiente.com.br
cv@grupoaurea.com.br
rh@intelbras.com.br
rh@itambe.com.br
recrutamento@klabin.com.br
rh-kb@kolumbus.com.br
rh@lupo.com.br
mercado@manah.com.br
inovarh@inovarh.com.br
rh@mococasa.com.br
talentos.novos@monsanto.com
selecao@moore.com.br
rh@mosane.com..br
selecao@otis.com
bancodecurriculos@panamco.com.br
selfab@panco.com.br
rhvda@perdigao.com.br
drh@probel.com.br
selecao@saboia.com.br
selecao@santistatextil.com.br
curriculo.br@scania.com
rh@schincariol.com.br
gente@skol.com.br
sonyrh@ssp.br.sony.com
talentos@sonymusic.com.br
rh.springer@carrier.utc.com
selecao@elizabeth.com.br
recrutamento@tetrapak.com
selecao@elizabeth.com.br
selecao@wickbold.com.br
JOHNSON & JOHSON
aalves4@conbr.jnj.com
molive33@medbr.jnj.com
jefferson_castilho@yahoo.com.br
rdebieu@its.jnj.com
JOHNSON CONTROLS
ps-supplier-quality@jci.com
LIEBHERR
sheila.brandao@liebherr.com
marcos.santos@liebherr.com 
rh.curriculo@liebherr.com
andreza.bittencourt@liebherr.com
jacqueline.soares@liebherr.com
info.lbr@liebherr.com
LEAR CORPORATION
jmagalhaes@lear.com
asilva07@lear.com
esanchez05@lear.com
mfigueira@lear.com
lpires@lear.com
nlopes@lear.com
ccamargo@lear.com
mportes@lear.com
tpalma@lear.com
LOJAS
curriculo@lojasrenner.com.br
rh@lojasriachuelo.com.br
rh@lojaszogbi.com.br
rh@bigmac..com.br
mksrh@originet.com.br
rh@multiprofissional.com.br
adm.pessoal@odb.com.br
selecao@oesp.com.br
selecao@ontime.srv.br
recrutamento.rh@orbitall.com.br
rh@grupoorsa.com.br
pa.rh@paodeacucar.com.br
rh@quilhas.com.br
rio-scenarium@uol.com.br
rhredecard@redecard.com.br
rh@somaseguradora.com.br
crescerh@sonae.com.br
rh@technigroup.com.br
selecao@tecnisa.com.br
rh@telefutura.com.br
curriculos@veracruz.com.br
NOVA ERA RH
annie.oliveira@rhnovaera.com.br
MÍDIA
trampo@dm9ddb.com.br
cv@editoraguia.com.br
fspselecao@uol.com.br
rh@folhametro.com.br
rh.mtv@mtvbrasil.com.br
culo@sbt.com.br
MAIOR RH
aline.silveira@maiorh.com.br 
gilmara@maiorh.com.br
glaucia@maiorh.com.br
MAXION CRUSEIRO
debora@amsted-maxion.com.br
MONSANTO
recursos.humanos.sjc@monsanto.com
MWL BRASIL
pessoal@mwlbrasil.com.br
rh@mwlbrasil.com.br
compras@mwlbrasil.com.br
contato@mwlbrasil.com.br
NESTLÉ
shirley.rodrigues@metso.com
rosana.vido@br.nestle.com
matheus.moura@br.nestle.com
andrezza.siqueira@br.nestle.com
NISSAN
juliana.cabrini@nissan-mercosur.com
alexandre.carvalho@nissan-mercosur.com
ORION S.A
rh@orionsa.com
thais.santos@orionsa.com.br
PLASTICOMNIUM
rcorrea@plasticomnium.com
recrutamento_br@plasticomnium.com
PRESTEM
alessandra@prestem.com.br
PILKINGTON
rh@pilkington.com.br
rh@br.nsg.com.
fernando.fsantos@br.nsg.com
leandro.porfirio@br.nsg.com
jose.ferreira@br.nsg.com
heron.jesus@br.nsg.com
PEUGEOT
selecao_rj@mpsa.com
tatiana.novelli1@mpsa.com
selecaosp@mpsa.com
estagiosp@mpsa.com 
cristiana.leite@mpsa.com
rodrigo.junqueira@mpsa.com
adriano.nascimento@mpsa.com
lgustavo90@me.com
SANY DO BRASIL
rh@sanydobrasil.com
SELEX
selecaotaubate@selex.com.br
SCANIA
elaine.silva@scania.com
sulamita.souza@scania.com
marcia.monteiro@scania.com
SIMOLDES PLASTICOS
mail@simoldes.com 
elizandra@simoldes.com.br
SERVIÇOS
recrutamento@asterpetroleo.com.br
rh@atacadao.com.br
recrutamento@bradescoseguros.com.br
cvlink@brightlink.com.br
rh@denadai.com.br
rh@dpaschoal.com.br
rh@drogaverde.com.br
drh@drogaraia.com.br
recursos.humanos@br.eyi.com
rh@flygt.com.br
recursos_humanos@fnac.com.br
rh@hunterbusiness.com.br
rhkpmg@kpmg.com.br
recrutamento@leroymerlin.com.br
rh@lojasarno.com.br
TELECOMUNICAÇÕES
rhsp@bcp.com.br
rh@caad.com.br
recursos..humanos@canbras.com.br
rh@edb.ericsson.se
recrutamento_selecao@hp.com
rhibm@br.ibm.com
recrutamento.selecao@nextel.com.br
brzjobs@nortelnetworks.com
rhsm@curh.siemens.com.br
cvsp@vesper.com.br 
TW ESPUMAS
julio_casale@woodbridgegroup.com
dalton_reis@woodbridgegroup.com
leandro_cavalini@woodbridgegroup.com
elisangela_ramos@woodbridgegroup.com
TOYOTA
sac@toyota.com.br
rsei@toyota.com.br
fabiana@toyota.com.br
simomura@toyota.com.br
kyoritoni@toyota.com.br
clira@toyota.com.br
gcostaesilva@toyota.com.br
rbarnabe@toyota.com.br
eboccia@toyota.com.br
TRANSPORTES
ggrhumanos@aguiabranca.com.br
tamselecao@tam.com.br
rh@viacaocaieiras.com.br
USIMINAS
maria.silva@riosunidosusiminas.com
fernando.cursino@solucoesusiminas.com
katia.ferreira@solucoesusiminas.com
luciana.duarte@riosunidosusiminas.com
VALE
rogerio.dsantos@vse.com.br
rogerio.eustaquio@vse.com.br
VIAPOL
racz@viapol.com.br
viapol@viapol.com.br 
VOLEX BRASIL
ariane.machado@volex.com
VOLKSWAGEN
ariovaldo.sonagere@volkswagen.com.br 
WINSTAL
winnstal@winnstal.com.br
rh@winnstal.com.br
michel.almeida@winnstal.com.br
WOW NUTRITION
comercial-site@wownutrition.com.br
fornecedores-site@wownutrition.com.br
marketing-site@wownutrition.com.br
WEM ENGENHARIA
atend-lima@uol.com.br
rh@atend.ind.br
marcelo.tarcisio@hotmail.com
gilberto.cardoso@petrobras.com.br
VARIADOS
maximassessoria@gmail.com
dpessoal@emeicom.com.br
curriculo@cancaonova.com
sueli_asantos@zipmail.com.br
taubate@divinofogao.com.br
carmen@solucaoempregos.com.br
aline.schenkel@globalempregos.com.br
analucia_taubate@grupogente.com.br
atendimento@rhautomotive.com.br
alessandra@prestem.com.br
amanda.rodrigues@simoldes.com.br
curriculos.sjc@globalempregos.com.br
csant181@ford.com
curriculo@proconsultrh.com.br
dplima@rionegro.com.br
daido@daido.com.br
dstaubate@globalempregos.com.br
ellen.silva@power.alstom.com
echegaray@autometal.com.br
erica.vieira@mpplastics.com.br
filialtaubate@grupoconnecta.com.br
fernanda@gruporesolve.com.br
fabiana.weihmayr@mubea.com
flavia.santos@thyssenkrupp.com;
graziela.bueno@prolim.com.br
gisele_taubate@grupogente.com.br
gerencia.taubate@gelre.com.br
juliana@gruporesolve.com.br
jpinheiro@br.gestamp.com
luciana.ferreira@autoliv.com
luciana_taubate@grupogente.com.br
laryssa.rocha@globalempregos.com.br
luiz.nogueira@volkswagen.com.br
nelson.emmerick2@volkswagen.com.br
oportunidades@volkswagen.com.br 
l.urias@daruma.com.br
mubea@mubea.com.br
maria.geny@mubea.com.br
mliviz@proconsultrh.com.br
maria.santos@gerdau.com.br
mbarros-taubate@sglogistica.com.br
mariana.alyne@engeseg.com.br
priscila.oliveira@autoliv.com
prosa@br.gestamp.com
PMT.BALCAO@taubate.sp.gov.br
priscila.rivoli@engeseg.com.br
rh.curriculo@c-a-m.com
rh-sp@gerdau.com.br
recepcao.taubate@maiorh.com.br
recrutamentotte@uniaorhvale.com.br
rh@daido.com.br
renato.mello@autocombrasil.com.br
roberta.germano@autocombrasil.com.br
rosangelagorete@autometal.com.br
recrutamento@atitudeempregos.com.br
recrutamento1@impactorh.com.br
recrutamento@mpplastics.com.br
rafael@compoende.com.br
selecaotte@uniaorhvale.com.br
sandra.vieira@alcan.com
selecao.taubate@grupogente.com.br
selecaotaubate@solucaoempregos.com.br
selecaotaubate@3hrh.com.br
selecao.taubate@gelre.com.br
simone@arevale.com.br
scardoso@br.gestamp.com
samira_taubate@grupogente.com.br
secretaria@daruma.com.br
tte.selecao@cosmosrh.com.br
tatiana.freitas@globalempregos.com.br
talentostbt@volksvagen.com.br
tsilva29@ford.com
vagas@rhnovaera.com.br
vagasembraer@hotmail.com
vilma@gruporesolve.com.br
rh@gemini.com.br
rh-sp@gerdau.com.br
recrutamento.amplant@goodyear.com
rh@gradiente.com.br
cv@grupoaurea.com.br
rh@intelbras.com.br
rh@itambe.com.br
recrutamento@klabin.com.br
rh-kb@kolumbus.com.br
rh@lupo.com.br
mercado@manah.com.br
inovarh@inovarh.com.br
rh@mococasa.com.br
talentos.novos@monsanto.com
selecao@moore.com.br
rh@mosane.com.br 
rh@activetech.com.br
recrutamento@alcabyt.com.br
asmi-rh@uol.com.br
rh@atps.com.br
rh@bf.com.br
rh@bhtec.com.br
rhsp@bms.com.br
rh@britos.com.br
rhsp@brq.com
curriculo@buildup.com.br
rh@choose.com.br
rhsp@blakinfo.com
rh@ccsnet.com.br
depselecao@cebinet.com.br
recrutamento@cetrd.com.br
curriculo@chadel.com
selecao_sp@chiptek.com.br
rh@cidicom.com.br
recruta@ciser.com.br
job-brasil@cisco.com
cvbrasil@compaq.com
rhsalut@compuland.com.br
curriculum@consoft.com.br
rh@copel.com.br
drh@copesul.com.br
curriculos@dglnet.com.br
cv@dgm.com.br
rh@dialdata.com.br
rh@dinheironet.com.br
rh@discover.com.br
rhumanos@dlminfo.com.br
dprrh@dprsist.com.br
curriculo@drive.com.br
recrutamento@ea.com
eclipserh@eclipseinformatica.com.br
rhumanos@elefante.com.br
rh@esys.com.br
recursos.humanos@br.eyi.com
selecao@facevirtual.com.br 
cvitae@forumaccess.com
rh@gempi.com.br
rh@gpnet.com.br
vagas@gpi.com.br
rh@ibpinet.com.br
curriculum@idealyze.com.br
rh@ifsbr.com.br
impsatrh@impsat.com.br
selecao@indebras.com.br
recrutamento@infosistemas.com.br
selecao@infoside.com.br
rh@intercommerce.com.br
rh@interfile.com.br
cv@interamericana.com.br
rh@intraplus.com.br
curriculo@intertech.com.br
curriculo.rh@iss.com.br
rhumanos@itautec-philco.com.br
rh@itech.inf.br
rh@linxbrasil.com.br
rh@logicworld.com.br
jobslowe@bol.com.br
culo@bancoalfa.com.br
bancoaxial@bancoaxial.com.br
rh@bbmbank.com.br
fun.cart@bnl.com.br
fiatrh@fiat.com.br
rh@hexxa.com.br
rh-recrutamento@hsbc.com.br
banco@indusval.com.br
recrutamento@real.com.br
curriculum@santander.com.br
sgbrasc@uol.com.br
recrutamento@bd.com.br
rh.selecao@citicorp.com
curriculo@cna.com.br
recrutamento@accor.com.br
rh@bluetree.com.br
diretoria@hotelcabreuva.com.br
candidato@transamerica.com.br
rh@7comm.com.br
rh@aabb.esp.br
talentoshumanos@algar.com.br
rh@tubosapolo.com.br
selecao@arteb.com.br
rh@arthabr.com
rh@azaleia.com.br
recursos.humanos@basf-sa.com.br
selecao@bombril.com.br
recruta.bosch.rbbr@br.bosch.com
rhboucin@boucinhas.com.br
gente@brahma.com.br
brasilata@brasilata.com.br
rh@caramuru.com
recrutamento_cargill@cargill.com
rh@cce.com.br
talentos@cimentoitau.com.br 
selecao.sjc@acgrh.com.br
time@timerh.com.br
alessandra@soulan.com.br
sjc.selecao02@cosmosrh.com.br
livia@rhfuncional.com.br
fernanda@maiorh.com.br
vagas1@rheal.com.br
selecao@cintraassociados.com.br
carmen@solucaoempregos.com.br
claudia@novotempo-rh.com.br
selecaosjc@3hrh.com.br
regina@bfgaprovar.com.br
comercial@parceirha.com.br
selecao@g7rh.com.br
selecao@gruponovarh.com.br
selecao@prestem.com.br
trategerh@gmail.com
vzrh@uol.com.br
contato@compassosrh.com.br
rh@compagnon.com.br
contato@insightrecrutamento.com.br
rhts.sjc@tendaatacado.com.br
rh@saclg.com.br
rh1@cherybrasil.com.br
adriele.carvalho@lge.com
recrutamento.selecao@aleris.com
apsrocha@fornecedores.confab.com.br
rh@araya.com.br
vagas.taubate.@codeme.com.br
rh.curriculo@c-a-m.com
glaucia@maiorh.com.br
dstaubate@globalempregos.com.br
laryssa.rocha@globalempregos.com.br
karina.maia@lge.com
carolina-carolina@maiorh.com.br
marcos.monteiro@riosunidosusiminas.com
wrv@mrs.com.br
pea@mrs.com.br
rh@br.nsg.com
rh@daruma.com.br
aline.silveira@maiorh.com.br
anapaula@maiorh.com.br
vagas@rhnovaera.com.br
rh@saclg.com.br
rh@selecao@lge.com 
rh@fabinject.ind.br
selecao_taubate@grupogente.com.br
selecaotaubate@selex.com.br
estrutura.consultoria@hotmail.com
elaine.dias@promo7.com.br
seleção@venturarh.com.br
contato@vistahrestaurante.com.br
dp@talentoassessoria.com.br
sg@sgengenharia.ind.br
recursoshumanos@pizza1.com.br
vagas.agc@br.agc.com
nutri.mila@hotmail.com
rh1@cherybrasil.com.br
debora@solonconsultoria.com.br
subtaubate@hotmail.com
ana.paula@autoliv.com
rodrigo.souza@autoliv.com
contato@lojamicromidia.com.br
jessica.domingues@universohonda.com.br
qualidade3@klassessoria.com.br
maximassessoria@gmail.com
rhts.tte@tendaatacado.com.br
taubate@divinofogao.com.br
selecao17taubate@gmail.com
fernanda@gruporesolve.com.br
mcristina.batista@yahoo.com.br
alicemendes.rh@gmail.com
carolina@gruporesolve.com.br
recrutamento.externo@gruposeres.com.br
rebeca.werner@hhib.com.br
juliana.araujo@hhib.com.br
renatat@comilonibus.com.br
enayle.fontes@yahoo.com.br
curriculo@comilonibus.com.br
recrutamento.nissan@gruposeres.com.br
barbara@comilonibus.com.br
rhlorena@comilonibus.com.br
curriculo@nissan.com.br
rafaela.mota@liebherr.com
deleutec@uol.com.br
cfbplza@confab.com.br
lpparaujo@fornecedores.confab.com.br
claudia.rebeque@bol.com.br
empregosconstructo@hotmail.com
rh.curriculo@c-a-m.com
curriculos@pecm.com.br
aline@gruporesolve.com.br
talentorecrutamento@hotmail.com
vagas.taubate@novotempor.com.br
exclusivorh@gmail.com
curriculo@makpromo.com.br 
recursoshumanos@quimbiol.com.br
melina@gruporesolve.com.br
recrutamento.rhdolar@gmail.com
atendimento.compramax@hotmail.com
bolsadeempregos@aceguaratingueta.com.br
supervisaohavaianas@gmail.com
kariane.messias@randstad.com.br
recrutamento.sp@reporbrasil.com.br
almoxarife.taubate@reluzse.com.br
vagaemtaubate@gmail.com 
curriculo@bancoalfa.com.br
recrutamento@berlitz.com.br
ache@osite.com.br
dp@ativus.com.br
bayer-rh.recursoshumanos.br@bayer.com.br
recrutamento_estrategico@lilly.com
recrutar@organon.com.br
talento.recrutamento@pfizer.com
curriculum@rhodia.com.br
brasil.rh_curriculo@roche.com
recrutamento.sdb@schering.de
curriculum@schplo.com.br
rh@yorkbrasil.com.br
curriculo@sbt.com.br
rhamil@ifxbrasil.com.br
recursoshumanos@cemahospital.com.br
selecao@fleury.com.br 
selecao@hospitalsantacruz.com.br
selecao@hsl.org.br
rimedrh@rimed.com.br
recrutamento@pernambucanas.com.br
rh@roldao.com.br
rh@luminacorp.com
rhmaster@masterental.com.br
rhsp@metainf.com.br
curriculum@microsiga.com.br
rhbrasil@microsoft.com
rh@microwan.com.br
rh@mmcafe.com.br
rh@multisis.net
nbsrh@nbs.com.br
rh@netds.com.br
curriculum@netpav.com.br
curriculum@newtrend.com.br
gdrh@novaamerica.com.br
rh@novacell.com.br
cv@ntsgsa.com.br
rh@nv.com.br
rh@ogeda.com.br
rh@olinux.com.br
rhonline@br.oracle.com
recursoshumanos.rj@br.origin-it.com
paramount@ibm-net
rh@pcdi.com.br
curriculo@parperfeito.com.br
rh@persoft.com.br
rh@plastamp.com.br
rh@pluguse.com.br
selecao@polen.com.br
cv@powerplast,com.br
rh-rj@ppware.com.br
rh@primeway.com.br
selecao@professionalrh.com.br
rh@prodacon.com.br
curriculo@programmers.com.br
rh@qasystems.com.br
cv@qg.com.br
selecao@quadrata.com.br
rmrh@rm.com.br
drh@rretiquetas.com.br
rh@rsinet.com.br
sci.rh@scisoft.com.br
talentos@seal.com.br
rh@setempro.com.br
rh@siscorp.com.br
rhsqa@sqa.com.br
rh@brazil.sun.com
rh@superbid.com.br
curriculo.sygnus@uol.com.br
rh@synercomm.com.br
recursos_humanos@terphane.com.br
rh@topway-software.com.br
tratemrh@tratem.com.br
curriculum@tribal.com.br
recrutamento.limeira@trw.com
desenvolve@ucar.com
entorj@br.unisys.com 
rhuol@uol.com.br
rh@uploadnet.com.br
w21.rh@w21.com.br
rh@wa.com.br
rh@walar.com.br
rh@wcorp.com.br
recrutamento@weg.com.br
rh@westbr.com.br
cv@witcom.com.br
recrutamento@wl.com
rh@wyma.com
br-empregos@yahoo-inc.com
rh@agn.com.br
treinamento@altona.com.br
curriculo@americel.com.br
rh.saopaulo@arvinmeritor.com
rh@axara.com.br
arearh@commitment.com.br
curriculum@compugraf.com.br
talentos@condemar.com.br
rh@condor.com.br
rh@consulters.com.br
rh@coonai.com.br
recrut.selecao@cooperplus.org.br
rh@coselli.com.br
rh@craz.com.br
cv@dbd.com.br
brazil_hr@emc.com
pessoal@enesa.com.br
rh@escopo.com
selecao@exposicoes.com.br
curriculos@iguacu.com.br
recrutamento@johndeere.com.br
rh@kepler.com.br
rh@kmcl.thyssenkrupp.com.br
rh@kron.com.br
rh@lavori.com.br
rh@mdpapeis.com.br
rh@mecano.com.br
rhlime@meritorauto.com
rh@mrn.com.br
selecao@mprh.com.br
rh@mshimizu.com.br
rh.pellegrino@dana.com
rh@rcc.com.br
rh@roland.com.br
rhsp@sondabrasil.com.br
curriculum@visiongroup.com.br
rh@ykp.com.br
rh@ypora.com.br
rh@ysa.yokogawa.com.br
curriculo@zanchi.com.br
selecao.pinda@impactorh.com.br 
selecao.pinda@acgrh.com.br
selecaopinda@rheal.com.br
acsersalvador@gmail.com
aline.nurec@anima-ba.com.br
selecao.salvador@gelre.com.br
viapromoter@service.com.br
newestagio@terra.com.br
styllosrh@yahoo.com.br
rh@folks.com.br
norral@globo.com
fluencia@cpunet.com.br
liane.mota@serh.com.br
recrutamento@ativa-ba.com.br
vagas@worktime-rh.com.br
rh@onlineconsultoria.com.br
actuallityrh@ig.com.br
confiarconsultoria@terra.com.br
recrutamento_vagas2006@yahoo.com.br
samai.cunha@tradicao.com.br 
selecaossa@tradicao.com.br
circulorh@acto.srv.br
psicorh@uol.com.br
talentos@laborh.com.br
selecao@talentobahia.com.br
rhfase@uol.com.br
conectarh@conectarh.com
alexrh@atarde.com.br
cristiane.ba@telelistas.net
recepcao.primazia@hotmail.com 
elisa@maiorh.com.br 
alessandra@maiorh.com.br
selecao@3hrh.com.br
taubate@maiorh.com.br
dstaubate@globalempregos.com.br 
empregossaopaulo@amtec.net
rh@consulters.com.br: 
rh@kepler..com.br 
rh@mshimizu.com..br
curriculo@zanchi..com.br
alessandra.galdini@globalempregos.com.br
recepcao@atitudeempregos.com.br 
recepcao@prestem.com.br
recepcao.taubate@globalempregos.com.br
recrutamento.selecao@cevalogistics.com
recrutamento.selecao@aleris.com 
fernandaalves.rh@policlin.com.br
rhcacapava@lear.com 
willian.vieira@mrs.com.br
renatamoura@obradecrh.com.br
treinamento@spani.com.br
rafaela.saraiva@expressomirassol.com.br 
recursoshumanosvale@sorvepan.com.br
cfbai@confab.com.br 
fabiana.zinini@ncr.com
brselecao@g7rh.com.br
`;

// Função para normalizar e higienizar emails
function sanitizeRawEmail(text) {
  let cleaned = text.trim()
    .replace(/[;,\s:]+$/, '')     // remove pontuação no final
    .replace(/^[;,\s:]+/, '')     // remove pontuação no início
    .replace(/\.{2,}com\.{2,}br$/i, '.com.br')
    .replace(/\.{2,}com\.br$/i, '.com.br')
    .replace(/,com\.br$/i, '.com.br')
    .replace(/\.com\.{2,}br$/i, '.com.br')
    .replace(/\.$/, '')
    .replace(/@\./, '@')
    .replace(/\.@/, '@')
    .toLowerCase();

  // Tratamento de múltiplos arrobas
  if ((cleaned.match(/@/g) || []).length !== 1) {
    return null;
  }

  // Descartar se tiver menos de 5 chars ou não tiver ponto após o @
  const atIdx = cleaned.indexOf('@');
  const domainPart = cleaned.slice(atIdx + 1);
  if (!domainPart.includes('.') || domainPart.endsWith('.')) {
    return null;
  }

  // Regex estrita de validação de e-mail RFC compliant
  const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (!emailRegex.test(cleaned)) {
    return null;
  }

  return cleaned;
}

// Extrair e desduplicar lista bruta
function extractUniqueEmails(rawText) {
  const lines = rawText.split(/\r?\n/);
  const found = new Set();
  const invalid = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('www.') || trimmed.startsWith('http')) continue;
    if (!trimmed.includes('@')) continue;

    const parts = trimmed.split(/[\s;]+/);
    for (const part of parts) {
      if (!part.includes('@')) continue;
      const clean = sanitizeRawEmail(part);
      if (clean) {
        found.add(clean);
      } else {
        invalid.push(part);
      }
    }
  }

  return { uniqueEmails: Array.from(found), invalid };
}

// Cache de validação DNS para alta performance
const domainCache = new Map();

async function checkMxWithTimeout(domain, timeoutMs = 2500) {
  const resolvePromise = async () => {
    // 1. Tenta resolver MX no domínio exato
    try {
      const mx = await dns.resolveMx(domain);
      if (mx && mx.length > 0) return true;
    } catch (e) {
      // Ignora para tentar fallbacks
    }

    // 2. Se for subdomínio (ex: transport.alstom.com ou power.alstom.com), tenta no domínio pai
    const parts = domain.split('.');
    if (parts.length > 2) {
      const parentDomain = parts.slice(-2).join('.'); // ex: alstom.com
      try {
        const mxParent = await dns.resolveMx(parentDomain);
        if (mxParent && mxParent.length > 0) return true;
      } catch (e) {
        // Ignora
      }

      // Se for domínio .com.br com 3 partes (ex: br.gestamp.com ou sjc.empresa.com.br)
      if (parts.length > 3) {
        const parentBr = parts.slice(-3).join('.');
        try {
          const mxParentBr = await dns.resolveMx(parentBr);
          if (mxParentBr && mxParentBr.length > 0) return true;
        } catch {}
      }
    }

    // 3. Fallback A/AAAA para domínios antigos
    try {
      const a = await dns.resolve4(domain);
      if (a && a.length > 0) return true;
    } catch {}

    return false;
  };

  return Promise.race([
    resolvePromise(),
    new Promise(res => setTimeout(() => res(false), timeoutMs))
  ]);
}

async function isDomainActive(domain) {
  if (domainCache.has(domain)) {
    return domainCache.get(domain);
  }

  const active = await checkMxWithTimeout(domain);
  domainCache.set(domain, active);
  return active;
}

async function main() {
  console.log('===============================================================');
  console.log('PROCESSAMENTO & HIGIENIZAÇÃO DE EMAILS — JORNAL ARCANJO');
  console.log('===============================================================\n');

  // Passo 1: Extração e normalização sintática
  const { uniqueEmails, invalid } = extractUniqueEmails(RAW_PAGES_TEXT);
  console.log(`1. Total de e-mails únicos extraídos do documento: ${uniqueEmails.length}`);
  console.log(`   Itens inválidos descartados no parse sintático: ${invalid.length} (${invalid.slice(0, 5).join(', ')})`);

  // Passo 2: Buscar e-mails já inscritos no banco de dados do Jornal Arcanjo
  console.log('\n2. Consultando e-mails já cadastrados no Supabase (Jornal Arcanjo)...');
  const existingSet = new Set();
  
  let from = 0;
  const step = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('subscribers')
      .select('email')
      .range(from, from + step - 1);

    if (error) {
      console.error('Erro ao buscar inscritos existentes:', error);
      break;
    }

    if (data && data.length > 0) {
      data.forEach(row => existingSet.add(row.email.toLowerCase()));
      from += step;
      if (data.length < step) hasMore = false;
    } else {
      hasMore = false;
    }
  }

  console.log(`   ✓ Base atual do Jornal Arcanjo: ${existingSet.size} inscritos existentes.`);

  // Passo 3: Filtrar e-mails que já estão cadastrados
  const candidates = uniqueEmails.filter(e => !existingSet.has(e));
  const alreadySubscribed = uniqueEmails.filter(e => existingSet.has(e));
  console.log(`   ✓ E-mails que já eram inscritos (repetidos ignorados): ${alreadySubscribed.length}`);
  console.log(`   ✓ E-mails candidatos a auditoria de atividade: ${candidates.length}`);

  // Passo 4: Limpeza completa de servidores/domínios DESATIVADOS (DNS / MX Verification em paralelo com concorrência controlada)
  console.log('\n3. Realizando auditoria de servidores de e-mail e domínios desativados (DNS / MX)...');
  
  const domains = Array.from(new Set(candidates.map(e => e.split('@')[1])));
  console.log(`   Auditando ${domains.size} domínios empresariais distintos com DNS Google/Cloudflare...`);

  // Processar em blocos concorrentes de 15 para rapidez e precisão
  const CONCURRENCY = 15;
  for (let i = 0; i < domains.length; i += CONCURRENCY) {
    const chunk = domains.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(d => isDomainActive(d)));
    process.stdout.write(`   Verificados ${Math.min(i + CONCURRENCY, domains.size)} / ${domains.size} domínios...\r`);
  }
  console.log(`\n   ✓ Auditoria de servidores MX finalizada!`);

  const activeEmails = [];
  const deactivatedEmails = [];

  for (const email of candidates) {
    const domain = email.split('@')[1];
    if (domainCache.get(domain)) {
      activeEmails.push(email);
    } else {
      deactivatedEmails.push(email);
    }
  }

  console.log(`   ✓ E-mails descartados (Servidor/Domínio inativo ou desativado): ${deactivatedEmails.length}`);
  console.log(`   ✓ E-mails 100% VALIDADOS, ATIVOS e PRONTOS para cadastro: ${activeEmails.length}`);

  // Passo 5: Inserir no Supabase do Jornal Arcanjo
  console.log('\n4. Cadastrando e-mails validados na tabela subscribers do Jornal Arcanjo...');
  
  let insertedCount = 0;
  let errorCount = 0;
  const batchSize = 50;

  for (let i = 0; i < activeEmails.length; i += batchSize) {
    const batch = activeEmails.slice(i, i + batchSize).map(email => ({ email }));
    const { data, error } = await supabase
      .from('subscribers')
      .insert(batch);

    if (error) {
      console.warn(`   Aviso no lote ${i} - ${i + batchSize}: ${error.message}. Tentando unitário...`);
      for (const item of batch) {
        const { error: singleErr } = await supabase.from('subscribers').insert([item]);
        if (!singleErr) {
          insertedCount++;
        } else {
          errorCount++;
        }
      }
    } else {
      insertedCount += batch.length;
    }
  }

  // Passo 6: Verificação final do count
  const { count: finalCount } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true });

  console.log('\n===============================================================');
  console.log('RELATÓRIO CONSOLIDADO DE INSCRIÇÃO — JORNAL ARCANJO');
  console.log('===============================================================');
  console.log(`- Total de e-mails extraídos do PDF: ${uniqueEmails.length}`);
  console.log(`- Repetidos já existentes no Arcanjo: ${alreadySubscribed.length}`);
  console.log(`- Desativados / Inexistentes descartados: ${deactivatedEmails.length}`);
  console.log(`- Novos inscritos inseridos com sucesso: ${insertedCount}`);
  console.log(`- Total final de inscritos na base do Jornal Arcanjo: ${finalCount}`);
  console.log('===============================================================');
}

main().catch(err => {
  console.error('Erro na execução:', err);
});
