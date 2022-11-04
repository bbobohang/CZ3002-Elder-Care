import React, { useEffect, useState, useRef } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated'

import './Profile.css';

//const conditions = JSON.parse("../Issues.json")
// const animatedComponents = makeAnimated();

const Profile = () => {
	const [med, setMed] = useState([]);
	const refInput = useRef();
	const navigate = useNavigate();
	const [accepted, setAccepted] = useState('3');
	const [pending, setPending] = useState('3');
	const [records, setRecords] = useState({name: '', address:'', block_no:'', postal_code:''});
	const [email, setEmail] = useState({})

	useEffect(() => {
		axios.get(`/api/med/current`).then((response) => {
			setMed(response.data);
			console.log(response.data);
		});
		axios.get(`/api/med/count/accepted`).then((response) => {
			setAccepted(response.data);
			console.log(response.data);
		});
		axios.get(`/api/med/count/pending`).then((response) => {
			setPending(response.data);
			console.log(response.data);
		});
		axios.get(`/api/record/current`).then((response) => {
			setRecords(response.data);
			console.log(response.data);
		});
		axios.get(`/api/auth/check`).then((response) => {
			setEmail(response.data);
			console.log(response.data);
		});
	}, []);

	const handleClick = async (e) => {
		console.log(refInput);
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		let postData = {
			name: refInput.current[0].value + ' ' + refInput.current[1].value,
			medical_conditions: refInput.current[9].value,
			address: refInput.current[6].value,
			block_no: refInput.current[7].value,
			postal_code: refInput.current[8].value,
		};
		if(postData.name !== '' && postData.address !== '' && postData.block_no !== '' && postData.postal_code !== ''){
			axios.post(`/api/record/update`, postData, axiosConfig).then((response) => {
				console.log(response);
				navigate('/profile/confirmation', { replace: true });
			});
		}
		else{
			alert("Please fill in ALL the required fields (marked with *)")
		}
	};

	return (
		<>
			<Navbar />
			<div className='headerWrapper'>
				<div className='headerContainer'>
					<div className='headerLeft'>
						<h1>
							<div style={{color: "#00856F"}}>Welcome,</div>
							{`${records.name}`}
						</h1>
						<p>
							{`${email.email}`}
							<br /> {`${records.address} ${records.block_no} ${records.postal_code}`} 
						</p>
						<button className='headerBtn'>
							MANAGE PERSONAL INFO
						</button>
					</div>
					<div className='headerRight headerMed'></div>
					<div className='headerBanner'>
						<div className='innerBanner'>
							<div className='innerContainer innerMed'>
								<h1>Pending</h1>
								<p>{pending} delivery</p>
							</div>
							<div className='innerContainer innerContainerBorder innerMed'>
								<h1>Accepted</h1>
								<p>{accepted} delivery</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='profileWrapper'>
				<div className='profileContainer'>
					<div className='editProfile'>
						<h2>|Edit Profile</h2>
						<form ref={refInput}>
							<div className='inputList'>
								<div className='inputItemLeft'>
									<p>First Name (as on passport)*</p>
									<input
										className='form'
										type='text'
										name='FirstName'
										placeholder='First Name (as on passport)'
									/>
								</div>
								<div className='inputItem'>
									<p>Last Name (as on passport)*</p>
									<input
										className='form'
										type='text'
										name='LastName'
										placeholder='Last Name (as on passport)'
									/>
								</div>
								<div className='inputItemRight'>
									<p>Title</p>
									<select className='formDropdown' name='title' id='title'>
										<option>Title</option>
										<option value='Mr'>Mr</option>
										<option value='Mrs'>Mrs</option>
										<option value='Mdm'>Mdm</option>
										<option value='Miss'>Miss</option>
										<option value='Ms'>Ms</option>
										<option value='Dr'>Dr</option>
									</select>
								</div>
							</div>
							<div className='inputList'>
								<div className='inputItemLeft'>
									<p>Country/Region Code</p>
									<select
										id='phone'
										name='phone'
										className='formDropdown'
										placeholder='Country/Region Code'
									>
										<option>Country/Region Code</option>
										<option value='93'>Afghanistan +93</option>
										<option value='358'>Aland Islands +358</option>
										<option value='355'>Albania +355</option>
										<option value='213'>Algeria +213</option>
										<option value='1684'>American Samoa +1684</option>
										<option value='376'>Andorra +376</option>
										<option value='244'>Angola +244</option>
										<option value='1264'>Anguilla +1264</option>
										<option value='672'>Antarctica +672</option>
										<option value='1268'>Antigua and Barbuda +1268</option>
										<option value='54'>Argentina +54</option>
										<option value='374'>Armenia +374</option>
										<option value='297'>Aruba +297</option>
										<option value='61'>Australia +61</option>
										<option value='43'>Austria +43</option>
										<option value='994'>Azerbaijan +994</option>
										<option value='1242'>Bahamas +1242</option>
										<option value='973'>Bahrain +973</option>
										<option value='880'>Bangladesh +880</option>
										<option value='1246'>Barbados +1246</option>
										<option value='375'>Belarus +375</option>
										<option value='32'>Belgium +32</option>
										<option value='501'>Belize +501</option>
										<option value='229'>Benin +229</option>
										<option value='1441'>Bermuda +1441</option>
										<option value='975'>Bhutan +975</option>
										<option value='591'>Bolivia +591</option>
										<option value='599'>Bonaire, Sint Eustatius and Saba +599</option>
										<option value='387'>Bosnia and Herzegovina +387</option>
										<option value='267'>Botswana +267</option>
										<option value='55'>Bouvet Island +55</option>
										<option value='55'>Brazil +55</option>
										<option value='246'>British Indian Ocean Territory +246</option>
										<option value='673'>Brunei Darussalam +673</option>
										<option value='359'>Bulgaria +359</option>
										<option value='226'>Burkina Faso +226</option>
										<option value='257'>Burundi +257</option>
										<option value='855'>Cambodia +855</option>
										<option value='237'>Cameroon +237</option>
										<option value='1'>Canada +1</option>
										<option value='238'>Cape Verde +238</option>
										<option value='1345'>Cayman Islands +1345</option>
										<option value='236'>Central African Republic +236</option>
										<option value='235'>Chad +235</option>
										<option value='56'>Chile +56</option>
										<option value='86'>China +86</option>
										<option value='61'>Christmas Island +61</option>
										<option value='672'>Cocos (Keeling) Islands +672</option>
										<option value='57'>Colombia +57</option>
										<option value='269'>Comoros +269</option>
										<option value='242'>Congo +242</option>
										<option value='242'>
											Congo, Democratic Republic of the Congo +242
										</option>
										<option value='682'>Cook Islands +682</option>
										<option value='506'>Costa Rica +506</option>
										<option value='225'>Cote D'Ivoire +225</option>
										<option value='385'>Croatia +385</option>
										<option value='53'>Cuba +53</option>
										<option value='599'>Curacao +599</option>
										<option value='357'>Cyprus +357</option>
										<option value='420'>Czech Republic +420</option>
										<option value='45'>Denmark +45</option>
										<option value='253'>Djibouti +253</option>
										<option value='1767'>Dominica +1767</option>
										<option value='1809'>Dominican Republic +1809</option>
										<option value='593'>Ecuador +593</option>
										<option value='20'>Egypt +20</option>
										<option value='503'>El Salvador +503</option>
										<option value='240'>Equatorial Guinea +240</option>
										<option value='291'>Eritrea +291</option>
										<option value='372'>Estonia +372</option>
										<option value='251'>Ethiopia +251</option>
										<option value='500'>Falkland Islands (Malvinas) +500</option>
										<option value='298'>Faroe Islands +298</option>
										<option value='679'>Fiji +679</option>
										<option value='358'>Finland +358</option>
										<option value='33'>France +33</option>
										<option value='594'>French Guiana +594</option>
										<option value='689'>French Polynesia +689</option>
										<option value='262'>French Southern Territories +262</option>
										<option value='241'>Gabon +241</option>
										<option value='220'>Gambia +220</option>
										<option value='995'>Georgia +995</option>
										<option value='49'>Germany +49</option>
										<option value='233'>Ghana +233</option>
										<option value='350'>Gibraltar +350</option>
										<option value='30'>Greece +30</option>
										<option value='299'>Greenland +299</option>
										<option value='1473'>Grenada +1473</option>
										<option value='590'>Guadeloupe +590</option>
										<option value='1671'>Guam +1671</option>
										<option value='502'>Guatemala +502</option>
										<option value='44'>Guernsey +44</option>
										<option value='224'>Guinea +224</option>
										<option value='245'>Guinea-Bissau +245</option>
										<option value='592'>Guyana +592</option>
										<option value='509'>Haiti +509</option>
										<option value='0'>Heard Island and Mcdonald Islands +0</option>
										<option value='39'>Holy See (Vatican City State) +39</option>
										<option value='504'>Honduras +504</option>
										<option value='852'>Hong Kong +852</option>
										<option value='36'>Hungary +36</option>
										<option value='354'>Iceland +354</option>
										<option value='91'>India +91</option>
										<option value='62'>Indonesia +62</option>
										<option value='98'>Iran, Islamic Republic of +98</option>
										<option value='964'>Iraq +964</option>
										<option value='353'>Ireland +353</option>
										<option value='44'>Isle of Man +44</option>
										<option value='972'>Israel +972</option>
										<option value='39'>Italy +39</option>
										<option value='1876'>Jamaica +1876</option>
										<option value='81'>Japan +81</option>
										<option value='44'>Jersey +44</option>
										<option value='962'>Jordan +962</option>
										<option value='7'>Kazakhstan +7</option>
										<option value='254'>Kenya +254</option>
										<option value='686'>Kiribati +686</option>
										<option value='850'>
											Korea, Democratic People's Republic of +850
										</option>
										<option value='82'>Korea, Republic of +82</option>
										<option value='381'>Kosovo +381</option>
										<option value='965'>Kuwait +965</option>
										<option value='996'>Kyrgyzstan +996</option>
										<option value='856'>Lao People's Democratic Republic +856</option>
										<option value='371'>Latvia +371</option>
										<option value='961'>Lebanon +961</option>
										<option value='266'>Lesotho +266</option>
										<option value='231'>Liberia +231</option>
										<option value='218'>Libyan Arab Jamahiriya +218</option>
										<option value='423'>Liechtenstein +423</option>
										<option value='370'>Lithuania +370</option>
										<option value='352'>Luxembourg +352</option>
										<option value='853'>Macao +853</option>
										<option value='389'>
											Macedonia, the Former Yugoslav Republic of +389
										</option>
										<option value='261'>Madagascar +261</option>
										<option value='265'>Malawi +265</option>
										<option value='60'>Malaysia +60</option>
										<option value='960'>Maldives +960</option>
										<option value='223'>Mali +223</option>
										<option value='356'>Malta +356</option>
										<option value='692'>Marshall Islands +692</option>
										<option value='596'>Martinique +596</option>
										<option value='222'>Mauritania +222</option>
										<option value='230'>Mauritius +230</option>
										<option value='262'>Mayotte +262</option>
										<option value='52'>Mexico +52</option>
										<option value='691'>Micronesia, Federated States of +691</option>
										<option value='373'>Moldova, Republic of +373</option>
										<option value='377'>Monaco +377</option>
										<option value='976'>Mongolia +976</option>
										<option value='382'>Montenegro +382</option>
										<option value='1664'>Montserrat +1664</option>
										<option value='212'>Morocco +212</option>
										<option value='258'>Mozambique +258</option>
										<option value='95'>Myanmar +95</option>
										<option value='264'>Namibia +264</option>
										<option value='674'>Nauru +674</option>
										<option value='977'>Nepal +977</option>
										<option value='31'>Netherlands +31</option>
										<option value='599'>Netherlands Antilles +599</option>
										<option value='687'>New Caledonia +687</option>
										<option value='64'>New Zealand +64</option>
										<option value='505'>Nicaragua +505</option>
										<option value='227'>Niger +227</option>
										<option value='234'>Nigeria +234</option>
										<option value='683'>Niue +683</option>
										<option value='672'>Norfolk Island +672</option>
										<option value='1670'>Northern Mariana Islands +1670</option>
										<option value='47'>Norway +47</option>
										<option value='968'>Oman +968</option>
										<option value='92'>Pakistan +92</option>
										<option value='680'>Palau +680</option>
										<option value='970'>Palestinian Territory, Occupied +970</option>
										<option value='507'>Panama +507</option>
										<option value='675'>Papua New Guinea +675</option>
										<option value='595'>Paraguay +595</option>
										<option value='51'>Peru +51</option>
										<option value='63'>Philippines +63</option>
										<option value='64'>Pitcairn +64</option>
										<option value='48'>Poland +48</option>
										<option value='351'>Portugal +351</option>
										<option value='1787'>Puerto Rico +1787</option>
										<option value='974'>Qatar +974</option>
										<option value='262'>Reunion +262</option>
										<option value='40'>Romania +40</option>
										<option value='70'>Russian Federation +70</option>
										<option value='250'>Rwanda +250</option>
										<option value='590'>Saint Barthelemy +590</option>
										<option value='290'>Saint Helena +290</option>
										<option value='1869'>Saint Kitts and Nevis +1869</option>
										<option value='1758'>Saint Lucia +1758</option>
										<option value='590'>Saint Martin +590</option>
										<option value='508'>Saint Pierre and Miquelon +508</option>
										<option value='1784'>Saint Vincent and the Grenadines +1784</option>
										<option value='684'>Samoa +684</option>
										<option value='378'>San Marino +378</option>
										<option value='239'>Sao Tome and Principe +239</option>
										<option value='966'>Saudi Arabia +966</option>
										<option value='221'>Senegal +221</option>
										<option value='381'>Serbia +381</option>
										<option value='381'>Serbia and Montenegro +381</option>
										<option value='248'>Seychelles +248</option>
										<option value='232'>Sierra Leone +232</option>
										<option value='65'>Singapore +65</option>
										<option value='1'>Sint Maarten +1</option>
										<option value='421'>Slovakia +421</option>
										<option value='386'>Slovenia +386</option>
										<option value='677'>Solomon Islands +677</option>
										<option value='252'>Somalia +252</option>
										<option value='27'>South Africa +27</option>
										<option value='500'>
											South Georgia and the South Sandwich Islands +500
										</option>
										<option value='211'>South Sudan +211</option>
										<option value='34'>Spain +34</option>
										<option value='94'>Sri Lanka +94</option>
										<option value='249'>Sudan +249</option>
										<option value='597'>Suriname +597</option>
										<option value='47'>Svalbard and Jan Mayen +47</option>
										<option value='268'>Swaziland +268</option>
										<option value='46'>Sweden +46</option>
										<option value='41'>Switzerland +41</option>
										<option value='963'>Syrian Arab Republic +963</option>
										<option value='886'>Taiwan, Province of China +886</option>
										<option value='992'>Tajikistan +992</option>
										<option value='255'>Tanzania, United Republic of +255</option>
										<option value='66'>Thailand +66</option>
										<option value='670'>Timor-Leste +670</option>
										<option value='228'>Togo +228</option>
										<option value='690'>Tokelau +690</option>
										<option value='676'>Tonga +676</option>
										<option value='1868'>Trinidad and Tobago +1868</option>
										<option value='216'>Tunisia +216</option>
										<option value='90'>Turkey +90</option>
										<option value='7370'>Turkmenistan +7370</option>
										<option value='1649'>Turks and Caicos Islands +1649</option>
										<option value='688'>Tuvalu +688</option>
										<option value='256'>Uganda +256</option>
										<option value='380'>Ukraine +380</option>
										<option value='971'>United Arab Emirates +971</option>
										<option value='44'>United Kingdom +44</option>
										<option value='1'>United States +1</option>
										<option value='1'>United States Minor Outlying Islands +1</option>
										<option value='598'>Uruguay +598</option>
										<option value='998'>Uzbekistan +998</option>
										<option value='678'>Vanuatu +678</option>
										<option value='58'>Venezuela +58</option>
										<option value='84'>Viet Nam +84</option>
										<option value='1284'>Virgin Islands, British +1284</option>
										<option value='1340'>Virgin Islands, U.s. +1340</option>
										<option value='681'>Wallis and Futuna +681</option>
										<option value='212'>Western Sahara +212</option>
										<option value='967'>Yemen +967</option>
										<option value='260'>Zambia +260</option>
										<option value='263'>Zimbabwe +263</option>
									</select>
								</div>
								<div className='inputItem'>
									<p>Phone Number</p>
									<input
										className='form'
										type='text'
										name='Phone Number'
										placeholder='Phone Number'
									/>
								</div>
								<div className='inputItemRight'>
									<p>Email</p>
									<input className='form' type='text' name='Email' placeholder='Email' />
								</div>
							</div>
							<div className='inputList'>
								<div className='inputItemLeft'>
									<p>Address*</p>
									<input
										className='form'
										type='text'
										name='Address'
										placeholder='Address'
									/>
								</div>
								<div className='inputItem'>
									<p>Block/Unit No.*</p>
									<input
										className='form'
										type='text'
										name='Block/UnitNo.'
										placeholder='Block/Unit No.'
									/>
								</div>
								<div className='inputItemRight'>
									<p>Postal Code*</p>
									<input
										className='form'
										type='text'
										name='PostalCode'
										placeholder='Postal Code'
									/>
								</div>
							</div>
							<div className='inputList'>
								<div className='inputItemLeft'>
									<p>Pre-Existing Medical Conditions (if any)</p>
									<select
										className='formDropdown'
										name='conditions'
										id='conditions'
										multiple

										style={{"height" : "100%"}}

									>
										<option value='170'>Abortion</option>

										<option value='509'>Accumulation of fluid in the scrotum</option>

										<option value='113'>Acute inflammation of lung</option>

										<option value='495'>Bloated belly</option>

										<option value='211'>Chronic tiredness syndrome</option>

										<option value='80'>Cold</option>

										<option value='53'>Constipation</option>

										<option value='86'>Coronary heart disease</option>

										<option value='47'>Depression</option>

										<option value='266'>Disturbed testicular descent</option>

										<option value='431'>Drug side effect</option>

										<option value='237'>Erection problems</option>

										<option value='181'>Excessive feeling of fear</option>

										<option value='11'>Flu</option>

										<option value='281'>Food poisoning</option>

										<option value='107'>German measles</option>

										<option value='104'>Headache</option>

										<option value='87'>Heart attack</option>

										<option value='434'>Heart racing</option>

										<option value='130'>Hernia</option>

										<option value='209'>Huntington's disease</option>

										<option value='15'>Hypersensitivity reaction</option>

										<option value='83'>
											Inflammation of the brain covering membranes
										</option>

										<option value='235'>Inflammation of the epididymis</option>

										<option value='44'>Inflammation of the nose and throat</option>

										<option value='504'>Inflammation of the prostate</option>

										<option value='331'>Inflammation of the testes</option>

										<option value='131'>Joint infection</option>

										<option value='324'>Kidney stones</option>

										<option value='109'>Kissing disease</option>

										<option value='166'>Listeria infection</option>

										<option value='51'>Loose watery stools</option>

										<option value='79'>Lyme disease</option>

										<option value='357'>Malignant prostate cancer</option>

										<option value='50'>Menopause</option>

										<option value='489'>Menstrual cramps</option>

										<option value='347'>Narrowing of foreskin</option>

										<option value='167'>Obstruction of a pulmonary artery</option>

										<option value='446'>Pregnancy</option>

										<option value='18'>Reflux disease</option>

										<option value='376'>Scarlet fever</option>

										<option value='68'>Shaking palsy</option>

										<option value='67'>Sick headache</option>

										<option value='103'>Slipped disc</option>

										<option value='19'>Smoking</option>

										<option value='510'>Sperm cyst</option>

										<option value='476'>Stomach bleeding</option>

										<option value='488'>Strain of the back muscles</option>

										<option value='151'>Torsion of testes</option>

										<option value='497'>Tubal and ovarian inflammation</option>

										<option value='59'>Urinary tract infection</option>
									</select>
								</div>
							</div>
						</form>
						<div className='save'>
							<button className='saveButton' onClick={handleClick}>
								SAVE
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Profile;
