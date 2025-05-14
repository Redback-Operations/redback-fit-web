import React, { useState } from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage: React.FC = () => {
	const [userData, setUserData] = useState({
		name: 'Austin Blaze',
		account: 'redback.operations@deakin.edu.au',
		birthDate: '2000-01-01',
		gender: 'Male',
	});
	const [avatar, setAvatar] = useState('src/assets/ProfilePic.png'); // Default avatar path

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setUserData({ ...userData, gender: e.target.value });
	};

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const newAvatarUrl = URL.createObjectURL(file);
			setAvatar(newAvatarUrl);
		}
	};

	const handleSave = () => {
		alert('User profile saved!');
	};

	const handleBack = () => {
		window.history.back();
	};

	return (
		<div className={styles.profilePageContainer}>
			<button className={styles.backButton} onClick={handleBack}>
				Back
			</button>
			<div className={styles.formContainer}>
				<div className={styles.avatarSection}>
					<img src={avatar} alt="User Avatar" className={styles.avatar} />
					<label htmlFor="avatarUpload" className={styles.uploadButton}>
						Change Avatar
					</label>
					<input
						id="avatarUpload"
						type="file"
						accept="image/*"
						className={styles.uploadInput}
						onChange={handleAvatarChange}
					/>
				</div>
				<div className={styles.formGroup}>
					<label className={styles.formLabel}>Name</label>
					<input
						type="text"
						name="name"
						value={userData.name}
						onChange={handleInputChange}
						className={styles.formInput}
					/>
				</div>
				<div className={styles.formGroup}>
					<label className={styles.formLabel}>Account</label>
					<input
						type="email"
						name="account"
						value={userData.account}
						onChange={handleInputChange}
						className={styles.formInput}
					/>
				</div>
				<div className={styles.formGroup}>
					<label className={styles.formLabel}>Birth Date</label>
					<input
						type="date"
						name="birthDate"
						value={userData.birthDate}
						onChange={handleInputChange}
						className={styles.formInput}
					/>
				</div>
				<div className={styles.formGroup}>
					<label className={styles.formLabel}>Gender</label>
					<select
						name="gender"
						value={userData.gender}
						onChange={handleGenderChange}
						className={styles.formSelect}
					>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<button className={styles.saveButton} onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	);
};

export default ProfilePage;

